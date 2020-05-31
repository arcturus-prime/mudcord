var Bot = require("./../bot");
var Base = require("./Base");

class Action extends Base {
  constructor(options) {
    super(options.world);
    this.player = options.player;
    this.location = options.location;
    this.actionString = options.actionString;
  }
}