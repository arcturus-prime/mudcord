var bot = require("./../bot");
var settings = require("./../settings.json");
var EventEmitter = require("events");
var Player2 = require("./Player");

class Battle extends EventEmitter {
  constructor(data) {
    super();
    if (data.name == undefined) {
      throw new Error("ClassCreationError: No battle name specified.");
    }
    this.name = data.name;
    this.id = Math.random()
      .toString()
      .slice(2, 11);
    if (data.guild == undefined) {
      throw new Error("ClassCreationError: No guild specified.");
    }
    this.guild = data.guild;
    this.admins = [];
    this.addAdmins(data.admins);
    this.users = [];
    this.addUsers(data.users);
    this.currentRound = 0;
    this.turnTimeLimit = data.turnTimeLimit;
    this.actions = [];
  }
  async action(data) {
    let userAlreadyTakenActionThisRound =
      (await this.actions.filter(
        action =>
          action.roundNumber == this.currentRound && action.user == data.user
      ).length) != 0;
    if (!userAlreadyTakenActionThisRound) {
      let newAction = new Action({
        user: data.user,
        actionString: data.actionString,
        roundNumber: this.currentRound
      });
      this.actions.push(newAction);
      await data.channel.send({
        embed: {
          title: this.name,
          description: "<@" + newAction.user.id + ">" + newAction.actionString
        }
      });

      this.emit("action", newAction);
      //This section creates two arrays of IDs:
      //First, a list of IDs of every user who has taken an action this round.
      //And second, a list of IDs of every user currently including in this battle.
      //Then it compares the two and determines if every element in the first array is present in the second array
      //signaling the start of a new round, as everyone has taken their action.
      let roundTakenActionUsersIDArray = [];
      this.actions
        .filter(action => action.roundNumber == this.currentRound)
        .forEach(action => {
          roundTakenActionUsersIDArray.push(action.user.id);
        });
      let battleUsersIDArray = [];
      this.users.forEach(user => {
        battleUsersIDArray.push(user.id);
      });
      let arraysContentsMatch = battleUsersIDArray.every(userid =>
        roundTakenActionUsersIDArray.includes(userid)
      );
      if (arraysContentsMatch) {
        this.currentRound++;
        this.emit("round");
      }
    }
  }
  async listActions(data) {
    let outputString = "";
    for (let x = 0; x < 10; x++) {
      try {
        outputString =
          outputString +
          "<@" +
          this.battle.actions[x].user.id +
          "> " +
          this.battle.actions[x].actionString +
          "\n\n";
      } catch (error) {
        console.log(error);
      }
    }
    await data.channel.send({
      embed: {
        title: this.name,
        description: outputString
      }
    });
  }
  resolveUser(data) {
    let output;
    if (typeof data == "string") {
      output = this.guild.members.resolve(data);
    } else if (typeof data == "object") {
      output = data;
    }
    return output;
  }
  addAdmin(data) {
    if (!this.admins.includes(data)) {
      this.admins.push(this.resolveUser(data));
    }
  }
  addAdmins(data) {
    data.forEach(element => {
      if (!this.admins.includes(element)) {
        this.admins.push(this.resolveUser(element));
      }
    });
  }
  addUser(data) {
    if (!this.users.includes(data)) {
      this.users.push(this.resolveUser(data));
    }
  }
  addUsers(data) {
    data.forEach(element => {
      if (!this.users.includes(element)) {
        this.users.push(this.resolveUser(element));
      }
    });
  }
}

class Proxy extends EventEmitter {
  constructor(data) {
    super();
    if (data.name == undefined) {
      throw new Error("ClassCreationError: No proxy name specified.");
    }
    this.name = data.name;
    this.id = Math.random()
      .toString()
      .slice(2, 11);
    this.guild = data.guild;
    this.users = [];
    for (let x in data.users) {
      let outputUser;
      if (typeof data.users[x] == "string") {
        outputUser = this.guild.members.resolve(data.users[x]);
      } else if (typeof data.users[x] == "object") {
        outputUser = data.users[x];
      }
      this.addUser(outputUser);
    }
  }
  addUser(user) {
    this.users.push(user);
  }
}

class Action extends EventEmitter {
  constructor(data) {
    super();
    this.user = data.user;
    this.id = Math.random()
      .toString()
      .slice(2, 11);
    this.actionString = data.actionString;
    this.roundNumber = data.roundNumber;
  }
}

var globalBattles = new Object();

//Module init function
module.exports.init = function() {
  bot.on("message", async message => {
    let isCommand = message.content.startsWith(settings.prefix);
    if (isCommand) {
      await commandHandler(message);
    }
  });
};

async function commandHandler(message) {
  switch (message.content.split(settings.prefix)[1].split(" ")[0]) {
    case "create":
      await createBattle(message);
      break;
    case "edit":
      await editHandler(message);
      break;
    case "add":
      await addHandler(message);
      break;
    case "remove":
      await removeHandler(message);
      break;
    case "a":
      await takeAction(message);
      break;
    case "list":
      await listHandler(message);
      break;
  }
}

//Task functions
async function createBattle(message) {
  try {
    let newBattleJSONData = JSON.parse(
      message.content
        .split(settings.prefix)[1]
        .split(" ")
        .splice(1)
        .join(" ")
    );
    newBattleJSONData.guild = message.guild;
    let newBattle = new Battle(newBattleJSONData);
    globalBattles[newBattle.id] = newBattle;
    await message.channel.send("Battle created with ID `" + newBattle.id + "`");
  } catch (error) {
    message.channel.send("```diff\n-" + error + "```");
  }
}

async function takeAction(message) {
  await globalBattles[
    message.content.split(settings.prefix)[1].split(" ")[1]
  ].action({
    user: message.member,
    actionString: message.content
      .split(settings.prefix)[1]
      .split(" ")
      .splice(2)
      .join(" "),
    channel: message.channel
  });
}

async function editHandler(message) {
  try {
    let currentBattle =
      globalBattles[message.content.split(settings.prefix)[1].split(" ")[1]];
    let battleJSONData = JSON.parse(
      message.content
        .split(settings.prefix)[1]
        .split(" ")
        .splice(1)
        .join(" ")
    );
    for (let x in battleJSONData) {
      switch (x) {
        case "name":
          currentBattle.name = battleJSONData.name;
          break;
        case "turnTimeLimit":
          currentBattle.turnTimeLimit = battleJSONData.turnTimeLimit;
          break;
        case "admins":
      }
    }
  } catch (error) {
    message.channel.send("```diff\n-" + error + "```");
  }
}

async function addHandler(message) {
  switch (message.content.split(settings.prefix)[1].split(" ")[1]) {
    case "user":
      break;
    case "proxy":
      break;
  }
}

async function removeHandler(message) {
  switch (message.content.split(settings.prefix)[1].split(" ")[1]) {
  }
}

async function listHandler(message) {
  switch (message.content.split(settings.prefix)[1].split(" ")[1]) {
    case "actions":
      await globalBattles[
        message.content.split(settings.prefix)[1].split(" ")[2]
      ].listActions({ channel: message.channel });
      break;
  }
}
