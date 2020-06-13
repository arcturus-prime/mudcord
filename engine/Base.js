var EventEmitter = require("events");
var Utility = require("./Utility");
var ClassCreationError = require("./ClassCreationError");

class Base extends EventEmitter {
  constructor(world) {
    super();
    if (!Utility.defined(world)) throw new ClassCreationError("No world object specified.");
    this.id = Utility.randomID(64);
    this.world = world;
  }
}

module.exports = Base;