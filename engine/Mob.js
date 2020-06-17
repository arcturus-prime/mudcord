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
    this.actionsTakenThisRound;
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
  //"build" function
  async init() {
  	this.world.mobs.add(this);
  	if(Utility.defined(this.battle)) this.battle.mobs.add(this);
  	if(Utility.defined(this.location)) this.location.mobs.add(this);
  	return this;
  }
  async action(actionString) {
    let action = new Action(this.world, {
    	mob: this.mob,
    	location: this.location,
    	actionString: actionString
    });
    await action.init();
    if (Utility.defined(this.battle)) {
      let registered = await this.battle._registerAction(action);
      if (!registered) {
        await action.delete();
        return;
      }
    }
    await this.location.textChannel.send({
      embed: {
        author: {
          name: this.name,
          iconURL: this.iconURL
        },
        description: action.actionString
        }
    });
    await this.emit("actionTaken", action);
    await action.location.emit("actionTaken", action);
  }
  async move(locationResolvable) {
  	let newLocation = this.world.locations.resolve(locationResolvable);
  	let currentLocation = this.location;
  	if (currentLocation.generated) {
  		await currentLocation.textChannel.send({
			embed: {
				description: `${mob.name} leaves.`
			}
		})
  	}
  	await currentLocation.emit("mobLeft", mob);
  	this._location = newLocation;
  	for (item of this.items) {
  		item[1].location.items.remove(item[1]);
		item[1]._location = newLocation;
		item[1].location.items.add(item[1]);
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