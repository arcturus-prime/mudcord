var Base = require("./Base");
var Utility = require("./Utility");

class Action extends Base {
	constructor(world, options) {
		super(world);
		if (!Utility.defined(options.mob)) throw new Error("Missing required option: mob");
		this._mob = options.mob;
		this._location = options.location;
		this._actionString = options.actionString;
		this._battle = options.battle;
	}
	get guild() {
		return this.world.guild;
	}
	get mob() {
		return this._mob;
	}
	get location() {
		return this._location;
	}
	get battle() {
		return this._battle;
	}
	init() {
		this.world.actions.add(this);
		if (Utility.defined(this.location)) this.location.actions.add(this);
		this.mob.actions.add(this);
		if (Utility.defined(this.battle)) this.battle.actions.add(this);
		return this;
	}
	delete() {
		this.world.actions.remove(this);
		if (Utility.defined(this.location)) this.location.actions.remove(this);
		this.mob.actions.remove(this);
		if (Utility.defined(this.battle)) this.battle.actions.remove(this);
	}
}
module.exports = Action;