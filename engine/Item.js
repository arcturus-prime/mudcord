var Base = require("./Base");
var Utility = require("./Utility");

class Item extends Base {
	constructor(world, options) {
		super(world);
		this.mob = options.mob;
		this.location = options.location;
		this.name = options.name;
		this.description = options.description;
		this._mob;
		this._location;
		this._init();
	}
	//getters and setters
	set mob(mobResolvable) {
		let newMob = this.world.mobs.resolve(mobResolvable);
		let currentMob = this._mob;
		let flag;
	    if (Utility.defined(currentMob)) {
	      if(Utility.defined(currentMob.items.resolve(this))) {
	        currentMob.item.remove(this);
	        flag = true
	      }
	    }
	    if (Utility.defined(newMob)) {
	    if(!Utility.defined(newMob.items.resolve(this))) {
	        newMob.items.add(this);
	        flag = true;
	      }
	    }
		if (flag) this.emit("changedMobs", currentMob, newMob);
	}
	get mob() {
		return this._mob;
	}
	set location(locationResolvable) {
		let currentLocation = this._location;
	    let newLocation = this.world.locations.resolve(locationResolvable);
	    let flag;
	    if (Utility.defined(currentLocation)) {
	      if(Utility.defined(currentLocation.items.resolve(this))) {
	        currentLocation.items.remove(this);
	        flag = true
	      }
	    }
	    if (Utility.defined(newLocation)) {
	    if(!Utility.defined(newLocation.items.resolve(this))) {
	        newLocation.items.add(this);
	        flag = true;
	      }
	    }
	    if (flag) this.emit("changedLocation", currentLocation, newLocation);
	}
	get location() {
		return this._location;
	}
	//methods
	_init() {
	}
	delete () {
		this.world.items.remove(this);
	}
}

module.exports = Item;