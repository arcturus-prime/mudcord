var Bot = require("./../bot");
var settings = require("./../settings");
var EventEmitter = require("events");
var Manager = require("./Manager");

class World extends EventEmitter{
  constructor(options) {
    super();
    this.id = (Math.floor(100000000 + Math.random() * 900000000)).toString();
    this.guild = Bot.guilds.resolve(options.guild);
    this.name = options.name;
    this.locations = new Manager(this);
    this.players = new Manager(this);
    this.actions = new Manager(this);
    this.battles = new Manager(this);
    this.items = new Manager(this);
  } 
}

module.exports = World;