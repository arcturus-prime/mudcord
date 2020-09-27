const Utility = require("./Utility");
const AsyncEventEmitter = require("asynchronous-emitter");

/**
 * The base class for most other classes
 * @extends {AsyncEventEmitter}
 * @abstract
 * @param  {World} world - The world that this object should be attached to
 */
class Base extends AsyncEventEmitter {
	constructor(world) {
		if (!world)
			throw new Error("No world object specified.");

		super();
		/**
		 * A unique identifier
		 * @type {String}
		 */
		this.id = Utility.randomID(18);
		/**
		 * The world associated with this object
		 * @type {World}
		 */
		this.world = world;
		/**
		 * The guild associated with this object
		 * @type {Guild}
		 */
		this.guild = this.world.guild;
	}
}

module.exports = Base;