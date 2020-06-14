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
		if (currentMob == newMob) return;
		let flag = false;
	    if (Utility.defined(currentMob)) {
	      if(Utility.defined(currentMob.items.resolve(this))) {
	      	this._mob = undefined;
	        currentMob.items.remove(this);
	        flag = true
	      }
	    }
	    if (Utility.defined(newMob)) {
		    if(!Utility.defined(newMob.items.resolve(this))) {
		    	this._mob = newMob;
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
	    if (currentLocation == newLocation) return;
	    let flag = false;
	    if (Utility.defined(currentLocation)) {
	      if(Utility.defined(currentLocation.items.resolve(this))) {
	      	this._location = undefined;
	        currentLocation.items.remove(this);
	        flag = true
	      }
	    }
	    if (Utility.defined(newLocation)) {
	    if(!Utility.defined(newLocation.items.resolve(this))) {
	    	this._location = newLocation;
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