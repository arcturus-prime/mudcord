var Base = require("./Base");
var Utility = require("./Utility");

class Action extends Base {
	constructor(world, options) {
		super(world);
		this._mob = options.mob;
		this._location = options.location;
		this._actionString = options.actionString;
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
	async init() {
		this.world.actions.add(this);
		if (Utility.defined(this.location)) this.location.actions.add(this);
		if (Utility.defined(this.mob)) this.mob.actions.add(this);
		return this;
	}
	async delete() {
		this.world.actions.remove(this);
		if (Utility.defined(this.location)) this.location.actions.remove(this);
		if (Utility.defined(this.mob)) this.mob.actions.remove(this);
	}
}
module.exports = Action;