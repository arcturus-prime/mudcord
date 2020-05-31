var Action = require("./Action");

class BattleAction extends Action {
  constructor(options) {
    super({ world: options.world })
  }
}