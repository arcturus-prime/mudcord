var AsyncEventEmitter = require('asynchronous-emitter');
var Utility = require("./Utility");

class Base extends AsyncEventEmitter {
  constructor(world) {
    super();
    if (!Utility.defined(world)) throw new Error("No world object specified.");
    this._id = Utility.randomID(18);
    this._world = world;
    this._deleted = false;
  }
  //Controlling object access
  get id() {
  	return this._id;
  }
  get world() {
  	return this._world;
  }
  get deleted() {
    return this._deleted;
  }
}

module.exports = Base;