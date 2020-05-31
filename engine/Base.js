var Bot = require("./../bot");
var settings = require("./../settings");
var EventEmitter = require("events");

class Base extends EventEmitter {
  constructor(world) {
    super();
    this.id = (Math.floor(100000000 + Math.random() * 900000000)).toString();
    this.world = world;
  }
}

module.exports = Base;