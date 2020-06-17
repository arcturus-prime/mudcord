var Base = require("./Base");
var Collection = require("./Collection");
var Action = require("./Action");
var Utility = require("./Utility");
var Location = require("./Location");
var Mob = require("./Mob");

class Battle extends Base {
  constructor(world, options) {
    super(world);
    this._location = this.world.locations.resolve(options.location);
    if (!Utility.defined(this.location)) throw new Error("Location object is required");
    this.name = options.name;
    this._mobs = new Collection(Mob);
    this._currentRound = 0;
    this._actions = new Collection(Action);
    this.roundTimeLimit = Utility.defined(options.roundTimeLimit) ? 60 : options.roundTimeLimit;
    this._currentTimeout;
    this._started = false;
  }
  //Controlling object access
  get started() {
    return this._started;
  }
  get guild() {
    return this.world.guild;
  }
  get location() {
    return this._location;
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
  init() {
    this.world.battles.add(this);
    this.location._battle = this;
  }
  //methods
  async start() {
    for (mob of this.mobs) {
    }
    this._currentTimeout = setTimeout(this.endRound, this.roundTimeLimit);
    this._started = true;
    await this.emit("started");
  }
  async addMob(mobResolvable) {
    let mob = this.world.mobs.resolve(mobResolvable);
    if (!Utility.defined(mob)) throw new Error("Missing required option: mobResolvable");
    await mob.move(this.location);
    this.mobs.add(mob);
    mob._battle = this;
    if (this.started) {
      await this.location.textChannel.send({
        embed: {
          author: {
            name: mob.name,
            iconURL: mob.iconURL
          },
          description: `joined the battle.`
        }
      });
    }

  }
  async removeMob(mobResolvable) {

  }
  delete() {
    this.world.battles.remove(this);
  }
  async _registerAction(action) {
    action._battle = this;
    this.actions.add(action);
    action.mob._actionsTakenThisRound++;
    await this.emit("actionTaken", action);
    if (this.mobs.every((value, key, map) => value.actionsTakenThisRound == value.actionsPerRound)) {
      await this._endRound();
    }
    return true;
  }
  async _endRound() {
    clearTimeout(this._currentTimeout);
    for (mob of this.mobs) {
      mobs[1].takenActionThisRound = false;
    }
    this.currentRound++;
    await this.emit("roundEnd");
    this._currentTimeout = setTimeout(this._endRound, this.roundTimeLimit);
  }
}

module.exports = Battle;