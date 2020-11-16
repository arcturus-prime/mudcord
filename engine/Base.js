const { randomID } = require("./utility");
const AsyncEventEmitter = require("asynchronous-emitter");

/**
 * The base class for most other classes
 * @extends {AsyncEventEmitter}
 * @abstract
 * @hideconstructor
 * @param  {World} world - The world that this object should be attached to
 */
class Base extends AsyncEventEmitter {
	static BASE_CREATION_ERROR = class BASE_CREATION_ERROR extends Error { };
	constructor(world) {
		if (!world) throw new BASE_CREATION_ERROR("No world object specified.");

		super();
		/**
		 * A unique identifier
		 * @type {String}
		 */
		this.id = randomID(18);
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