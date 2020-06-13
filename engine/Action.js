var Base = require("./Base");

class Action extends Base {
	constructor(world, options) {
		super(world);
		this.mob = options.mob;
		this.location = options.location;
		this.actionString = options.actionString;
	}
	get guild() {
		return this.world.guild;
	}
	delete() {
		this.world.actions.remove(this);
	}
}
module.exports = Action;