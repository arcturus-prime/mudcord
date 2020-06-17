var Base = require("./Base");
var Collection = require("./Collection");
var Action = require("./Action");
var Utility = require("./Utility");
var Location = require("./Location");
var Mob = require("./Mob");

class Battle extends Base {
  constructor(world, options) {
    super(world);
    this._locations = new Collection(Location);
    this.name = options.name;
    this._mobs = new Collection(Mob);
    this._currentRound = 0;
    this._actions = new Collection(Action);
    this.roundTimeLimit = Utility.defined(options.roundTimeLimit) ? 60 : options.roundTimeLimit;
    this._currentTimeout;
  }
  //Controlling object access
  get guild() {
    return this.world.guild;
  }
  get locations() {
    return this._locations;
  }
  get mobs() {
    return this._mobs;
  }
  get currentRound() {
    return this._currentRound;
  }
  get actions() {
    return this._actions;
  }
  //"build" function
  async init() {
    this.mobs._emitter.on("add", async (mob) => {
      mob.battle = this;
      await this.emit("mobEntered", this);
    });
    this.mobs._emitter.on("remove", async (mob) => {
      mob.battle = undefined;
      await this.emit("mobLeft", this);
    });
    this.locations._emitter.on("add", async (location) => {
      if(!Utility.exists(location.battles.resolve(this))) await location.battles.add(this);
    });
    this.locations._emitter.on("remove", async (location) => {
      if(Utility.exists(location.battles.resolve(this))) await location.battles.remove(this);
    });
    await this.world.battles.add(this);
  }

  //methods
  start() {
    this._currentTimeout = setTimeout(this.endRound, this.roundTimeLimit);
    this.emit("started");
  }
  delete() {
    this.world.battles.remove(this);
  }
  async _registerAction(actionResolvable) {
    let action = this.world.actions.resolve(actionResolvable);
    let mob = this.world.mobs.resolve(action.mob);
    if (!Utility.defined(this.locations.resolve(action.location))) return false;
    if (!Utility.defined(this.mobs.resolve(mob))) return false;
    if (this.mob.actionsTakenThisRound == this.mob.actionsPerRound) return false;
    this.actions._add(action);
    this.mob.actionsTakenThisRound++;
    this.emit("actionTaken", action);
    if (this.mobs.contents.array().every(mob => mob.actionsTakenThisRound == mob.actionsPerRound)) {
      await this._endRound();
    }
    return true;
  }
  async _endRound() {
    clearTimeout(this._currentTimeout);
    for (let x in this.mobs.contents) {
      this.mobs.contents[x].takenActionThisRound = false;
    }
    this.currentRound++;
    this.emit("roundEnd");
    this._currentTimeout = setTimeout(this._endRound, this.roundTimeLimit);
  }
}

module.exports = Battle;