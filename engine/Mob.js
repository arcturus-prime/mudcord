var Base = require("./Base");
var Collection = require("./Collection");
var Utility = require("./Utility");
var Item = require("./Item");
var Action = require("./Action");

class Mob extends Base {
  constructor(world, options) {
    super(world);
    this.name = options.name;
    this._actions = new Collection(Action);
    this._items = new Collection(Item);
    this.iconURL = options.iconURL;
    this.actionsPerRound = Utility.defined(options.actionsPerRound) ? 1 : options.actionsPerRound;
    this._actionsTakenThisRound;
    this._location = this.world.locations.resolve(options.location);
    this._battle = this.world.battles.resolve(options.battle);
  }
  //Controlling object access
  get guild() {
    return this.world.guild;
  }
  get location() {
    return this._location;
  }
  get battle() {
  	return this._battle;
  }
  get actions() {
    return this._actions;
  }
  get items() {
    return this._items;
  }
  get actionsTakenThisRound() {
  	return this._actionsTakenThisRound;
  }
  //"build" function
  async init() {
  	this.world.mobs.add(this);
  	if(Utility.defined(this.location)) await this.move(this.location);
  	if(Utility.defined(this.battle)) await this.battle.addMob(this);
  	return this;
  }
  async action(actionString) {
  	if (!Utility.defined(actionString)) throw new Error("Missing required option: actionString");
    let action = new Action(this.world, {
    	mob: this.mob,
    	actionString: actionString
    });
    action.init();
    this.actions.add(action);
    if (Utility.defined(this.battle)) {
    	if (!Utility.defined(this.battle.mobs.resolve(this.mob)) && this.actionsTakenThisRound == this.actionsPerRound) {
    		await this.battle._registerAction(action);
    	}
    }
    await this.location._registerAction(action);
    await this.emit("actionTaken", action);
  }
  async move(locationResolvable) {
  	let newLocation = this.world.locations.resolve(locationResolvable);
  	if (!Utility.defined(newLocation)) throw new Error("Requires a LocationResolvable");
  	let currentLocation = this.location;
  	if (Utility.defined(currentLocation)) {
  		if (!Utility.defined(this.battle)) await this.battle.removeMob(this);
  		currentLocation.mobs.remove(this);
  		this._location = undefined;
  		for (item of this.items) {
	  		item[1].location.items.remove(item[1]);
			item[1]._location = undefined;
		}
	  	if (currentLocation.generated) {
	  		await currentLocation.textChannel.send({
				embed: {
					description: `${mob.name} leaves.`
				}
			})
	  	}
	  	await currentLocation.emit("mobLeft", mob);
  	}
  	newLocation.mobs.add(this);
  	this._location = newLocation;
  	for (item of this.items) {
		item[1].location.items.add(item[1]);
		item[1]._location = newLocation;
	}
  	if (location.generated) {
		await this.textChannel.send({
			embed: {
				description: `${mob.name} enters.`
			}
		})
	}
	await newLocation.emit("mobEntered", mob);
	await this.emit("changedLocation", currentLocation, newLocation);
  }
  async delete() {
    this.battle.mobs.remove(this);
    this.location.mobs.remove(this);
    this.world.mobs.remove(this);
  }
}
module.exports = Mob;