var Bot = require("./../bot");
var settings = require("./../settings");
var Base = require("./Base");
var Player = require("./Player");
var Manager = require("./Manager");

class Location extends Base {
  constructor(options) {
    super(options.world);
    this.generated = false;
    this.guild = this.world.guild;
    this.players = new Manager(this.world);
    this.role;
    this.category;
    this.textChannel;
    this.voiceChannel;
    this.spacerChannel;
    this.name = options.name;
    this.north = options.north;
    this.buttonNorth;
    this.south = options.south;
    this.buttonSouth;
    this.east = options.east;
    this.buttonEast;
    this.west = options.west;
    this.buttonWest;
    this.up = options.up;
    this.buttonUp;
    this.down = options.down;
    this.buttonDown;
    this.world.locations.add(this);
  }
  async gen() {
    this.role = await this.guild.roles.create({ data: { name: settings.prefix + this.name } });
    this.category = await this.guild.channels.create(this.name, {
      type: "category",
      permissionOverwrites: [
        {
          id: this.role,
          allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
          deny: ["READ_MESSAGE_HISTORY", "EMBED_LINKS", "ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "SEND_TTS_MESSAGES", "ADD_REACTIONS"]
        },
        {
          deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "CONNECT"]
        }
      ]
    })
    this.textChannel = await this.guild.channels.create(this.name, {
      type: "text",
      parent: this.category,
      position: 1
    })
    this.voiceChannel = await this.guild.channels.create(this.name, {
      type: "voice",
      parent: this.category,
      position: 2
    })
    this.spacerChannel = await this.guild.channels.create("─────────────────────", {
      type: "voice",
      parent: this.category,
      permissionOverwrites: [{
          id: this.role,
          allow: [, "VIEW_CHANNEL"],
          deny: ["SEND_MESSAGES",  "CONNECT", "SPEAK"]
        }],
      position: 3
    })
    this.buttonNorth = await this.guild.channels.create("North", {
      type: "voice",
      parent: this.category,
      position: 4
    });
    await Location.bindVCButtonToLocation(this.buttonNorth, this.north);
    this.buttonSouth = await this.guild.channels.create("South", {
      type: "voice",
      parent: this.category,
      position: 5
    });
    await Location.bindVCButtonToLocation(this.buttonSouth, this.south);
    this.buttonEast = await this.guild.channels.create("East", {
      type: "voice",
      parent: this.category,
      position: 6
    });
    await Location.bindVCButtonToLocation(this.buttonEast, this.east);
    this.buttonWest = await this.guild.channels.create("West", {
      type: "voice",
      parent: this.category,
      position: 7
    });
    await Location.bindVCButtonToLocation(this.buttonWest, this.west);
    this.buttonUp = await this.guild.channels.create("Up", {
      type: "voice",
      parent: this.category,
      position: 8
    });
    await Location.bindVCButtonToLocation(this.buttonUp, this.up);
    this.buttonDown = await this.guild.channels.create("Down", {
      type: "voice",
      parent: this.category,
      position: 9
    });
    await Location.bindVCButtonToLocation(this.buttonDown, this.down);
    this.generated = true;
    this.emit("genEnd", this);
  }
  async destroy() {
    
  }
  async addPlayer(player) {
    player.location = this;
    this.players.add(player);
    await player.roles.add(this.role);
    await this.textChannel.send({ embed: {
      description: `${player.displayName} enters.`
    }})
  }
  async removePlayer(player) {
    this.players.remove(player);
    await player.roles.remove(this.role);
    await this.textChannel.send({ embed: {
      description: `${player.displayName} leaves.`
    }})
  }
  static async bindVCButtonToLocation(voiceChannel, location) {
    let world = location.world;
    Bot.on("voiceStateUpdate", async (oldState, newState) => {
      if (newState.channel == location.guild.channels.resolve(voiceChannel)) {
        world.players.resolve(newState.member).moveTo(location);
      }
    })
  }
}

module.exports = Location;