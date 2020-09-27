const Collection = require("./Collection");
const { Guild } = require("discord.js");
const Utility = require("./Utility");
const AsyncEventEmitter = require("asynchronous-emitter");
const Location = require("./Location");
const Mob = require("./Mob");
const Action = require("./Action");
const Battle = require("./Battle");
const Item = require("./Item");

/**
 * Represents a world and is the main class that all other classes connect to.
 * @extends {AsyncEventEmitter}
 * @param {Object} [options] - The options to create this world with
 * @param {String} [options.name] - A name for the world
 * @param {String} [options.prefix] - The prefix used to denote commands for this bot
 * @param {Guild} [options.guild] - The guild this world should be attached to
 */
class World extends AsyncEventEmitter {
	constructor(options = {}) {
		if (!options.prefix)
			throw new Error("No prefix specified in bot object.");
		if (!options.name)
			options.name = "A World";
		if (!options.guild)
			throw new Error("No guild GuildResolvable specified.");

		super();
		/**
		 * A unique identifier
		 * @type {String}
		 */
		this.id = Utility.randomID(18);
		/**
		 * The prefix used to denote commands for the bot
		 * @type {String}
		 */
		this.prefix = options.prefix;
		/**
		 * The guild that this world is attached to
		 * @type {Guild}
		 */
		this.guild = options.guild;
		/**
		 * The name of this world
		 * @type {String}
		 * @default "A World"
		 */
		this.name = options.name;
		/**
		 * All locations contained within this world
		 * @type {Collection}
		 */
		this.locations = new Collection(Location);
		/**
		 * All mobs contained within this world
		 * @type {Collection}
		 */
		this.mobs = new Collection(Mob);
		/**
		 * All actions that have been performed in this world
		 * @type {Collection}
		 */
		this.actions = new Collection(Action);
		/**
		 * All battle that are currently taking place in this world
		 * @type {Collection}
		 */
		this.battles = new Collection(Battle);
		/**
		 * All items contained within this world
		 * @type {Collection}
		 */
		this.items = new Collection(Item);
		/**
		 * The Discord bot that is being used for this world
		 * @type {Client}
		 */
		this.bot = this.guild.client;
	}
	/**
	 * Runs the `generate()` method on every location that is attached to this world
	 * @async
	 * @return {Promise<void>}
	 */
	async generateAll() {
		for (let location of this.locations) {
			await location[1].generate();
		};
	}
	/**
	 * The reverse of `generateAll()`
	 * Runs the `ungenerate()` method on every location that is attached to this world
	 * @async
	 * @return {Promise<void>}
	 */
	async ungenerateAll() {
		for (let location of this.locations) {
			await location[1].ungenerate();
		}
	}
}

module.exports = World;