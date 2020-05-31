var Bot = require("./../bot");
var Base = require("./Base");

class Item extends Base {
  constructor(options) {
    super(options.world);
    this.player = options.player;
    this.location = options.location;
  }
}