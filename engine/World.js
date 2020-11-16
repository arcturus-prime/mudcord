const Collection = require("./Collection");
const { Guild } = require("discord.js");
const utility = require("./utility");
const AsyncEventEmitter = require("asynchronous-emitter");
const Location = require("./Location");
const Mob = require("./Mob");
const Action = require("./Action");
const Battle = require("./Battle");
const CommandHandler = require("./CommandHandler");

/**
 * Represents a world and is the main class that all other classes connect to.
 * @extends {AsyncEventEmitter}
 * @public
 * @param {Object} [options] - The options to create this world with
 * @param {String} [options.name] - A name for the world
 * @param {String} [options.prefix] - The prefix used to denote commands for this bot
 * @param {Guild} [options.guild] - The guild this world should be attached to
 */
class World extends AsyncEventEmitter {
	static WORLD_CREATION_ERROR = class WORLD_CREATION_ERROR extends Error { };
	constructor(options = {}) {
		if (!options.prefix)
			throw new WORLD_CREATION_ERROR("No prefix specified.");
		if (!options.guild)
			throw new WORLD_CREATION_ERROR("No guild GuildResolvable specified.");
		if (!options.name)
			options.name = "A World";

		super();
		/**
		 * A unique identifier
		 * @public
		 * @type {String}
		 */
		this.id = utility.randomID(18);
		/**
		 * The prefix used to denote commands for the bot
		 * @public
		 * @type {String}
		 */
		this.prefix = options.prefix;
		/**
		 * The guild that this world is attached to
		 * @public
		 * @type {Guild}
		 */
		this.guild = options.guild;
		/**
		 * The name of this world
		 * @type {String}
		 * @public
		 * @default "A World"
		 */
		this.name = options.name;
		/**
		 * All locations contained within this world
		 * @public
		 * @type {Collection}
		 */
		this.locations = new Collection(Location);
		/**
		 * All mobs contained within this world
		 * @public
		 * @type {Collection}
		 */
		this.mobs = new Collection(Mob);
		/**
		 * All actions that have been performed in this world
		 * @public
		 * @type {Collection}
		 */
		this.actions = new Collection(Action);
		/**
		 * All battle that are currently taking place in this world
		 * @public
		 * @type {Collection}
		 */
		this.battles = new Collection(Battle);
		/**
		 * All commandHandlers that have been created in this world
		 * @public
		 * @type {Collection}
		 */
		this.commandHandlers = new Collection(CommandHandler);
		/**
		 * The Discord bot that is being used for this world
		 * @public
		 * @type {Client}
		 */
		this.bot = this.guild.client;
	}
	/**
	 * Runs the `generate()` method on every location that is attached to this world
	 * @async
	 * @public
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
	 * @public
	 * @return {Promise<void>}
	 */
	async ungenerateAll() {
		for (let location of this.locations) {
			await location[1].ungenerate();
		}
	}
	/**
	 * Runs the `spawn()` method on every mob that is attached to this world
	 * @async
	 * @public
	 * @return {Promise<void>}
	 */
	async spawnAll() {
		for (let mob of this.mobs) {
			await mob[1].spawn();
		}
	}
}

module.exports = World;