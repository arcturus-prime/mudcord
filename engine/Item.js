const Base = require("./Base");
const Utility = require("./Utility");
const CommandHandler = require("./CommandHandler");

/**
 * Represents an item
 * @extends {Base}
 * @param {World} world - The world to create this item in
 * @param {Object} options - The options to create this item with
 */
class Item extends Base {
	constructor(world, options = {}) {
		super(world);
		/**
		 * The name of this item
		 * @type {String}
		 */
		this.name = options.name;
		/**
		 * A short description of the item
		 * @type {String}
		 */
		this.description = options.description;
		/**
		 * The mob who possesses this item (if any)
		 * @type {Mob}
		 */
		this.mob = null;
		/**
		 * The location this item is currently at
		 * @type {Location}
		 */
		this.location = null;
		/**
		 * The CommandHandler for this item
		 */
		this.commandHandler = new CommandHandler({ condition: (message) => this.mob ? this.mob.guildMember.id : null == message.member.id });

		this.world.items.add(this);
	}
}

module.exports = Item;