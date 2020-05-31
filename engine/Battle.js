var Bot = require("./../bot");
var Base = require("./Base");
var Manager = require("./Manager");
var Action = require("./Action");

class Battle extends Base {
  constructor(options) {
    this.locations = options.locations;
    super(this.locations[0].world);
    this.name = options.name;
    this.guild = this.world.guild
    this.players = new Manager(this.world);
    this.currentRound = 0;
    this.turnTimeLimit = options.turnTimeLimit;
    this.actions = new Manager(this.world);
    this.world.battles.add(this);
  }
  /*async action(data) {
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
      this.actions.add(newAction);
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
  }*/
}