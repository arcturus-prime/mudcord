const Base = require("./Base");
const Utility = require("./Utility");

/**
 * Represents an action performed by a mob entity
 * @extends {Base}
 * @param  {World} world - The world in which this action should be performed
 * @param  {String} string - The string describing this action
 */
class Action extends Base {
	constructor(world, string, options = {}) {
		super(world);
		/**
		 * The mob that performed this action
		 * @type {Mob}
		 */
		this.mob = options.mob;
		/**
		 * The location where this action was performed
		 * @type {Location}
		 */
		this.location = options.location;
		/**
		 * A description of the action (this is what the end-user sees)
		 * @type {String}
		 */
		this.string = string;
		/**
		 * The battle in which this action was performed (if any)
		 * @type {Battle}
		 */
		this.battle = options.battle;

		this.world.actions.add(this);
	}
}

module.exports = Action;