var Base = require("./Base");
var Utility = require("./Utility");

class Item extends Base {
	constructor(world, options) {
		super(world);
		this.name = options.name;
		this.description = options.description;
		this._mob = this.world.mobs.resolve(options.mob);
		this._location = this.world.locations.resolve(options.location);
	}
	//Controlling object access
	get mob() {
		return this._mob;
	}
	get location() {
		return this._location;
	}
	//"build" function
	async init() {
		this.world.items.add(this);
		if (Utility.defined(this.mob)) this.mob.items.add(this);
		if (Utility.defined(this.location)) this.location.items.add(this);
		return this;
	}
	async delete () {
		this.mob.items.remove(this);
		this.location.items.remove(this);
		this.world.items.remove(this);
	}
}

module.exports = Item;