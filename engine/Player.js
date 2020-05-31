var Bot = require("./../bot");
var Discord = require("discord.js")
var settings = require("./../settings");
var Base = require("./Base");

class Player extends Discord.GuildMember {
  constructor(discordGuildMember, options) {
    super(Bot, discordGuildMember, discordGuildMember.guild);
    this.id = this.user.id;
    this.world = options.world;
    this.name = options.name;
    this.location = options.location;
    this.battle = options.battle;
    this.kills = 0;
    this.world.players.add(this);
  }
  async moveTo(location) {
    await this.location.removePlayer(this);
    await location.addPlayer(this);
    this.location = location;
  }
}

module.exports = Player;