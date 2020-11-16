const { GuildChannel } = require("discord.js");
const Base = require("./Base");
const utility = require("./utility");

/**
 * Handles incoming messages containing commands
 * @extends Base
 * @param {World} world - The World object to add this CommandHandler to
 * @param {Object} options - The options for this CommandHandler
 */
class CommandHandler extends Base {
	static COMMANDHANDLER_CREATION_ERROR = class COMMANDHANDLER_CREATION_ERROR extends Error { };
	constructor(world, options = {}) {
		if (!options.condition) throw new COMMANDHANDLER_CREATION_ERROR("No condition provided");

		super(world);
		/**
		 * An object containing all the commands this handler deals with.
		 * Commands are in the key value format, where the key is the command the user uses, and where the value is the function to be called.
		 * An arguments array is passed to the function that contains the rest of the user's message.
		 * @public
		 * @type {Object}
		 */
		this.commands = options.commands;
		/**
		 * A condition function that each message must meet in order to be passed to the CommandHandler.
		 * @public
		 * @example
		 * (message) => message.member.id == this.mob.guildMember.id
		 * @type {Function}
		 */
		this.condition = options.condition;
		/**
		 * An optional argument that limits the handler to a specific channel
		 * @public
		 * @type {GuildChannel}
		 */
		this.channel = options.channel;
		this.world.bot.on("message", async (message) => {
			if (await this.condition(message) && message.content.startsWith(this.world.botPrefix) && message.guild == this.guild) {
				if (this.channel) {
					if (this.channel != message.channel)
						return;
				}
				await this._evalCommand(message);
			}
		});
		this.world.commandHandlers.add(this);
	}
	/**
	 * Adds commands to the handler list
	 * Format for the "commands" option is similar to the one used when creating a CommandHandler
	 * @param {Object} commands - An object containing the commands to be added.
	 * @public
	 * @example
	 * myCommandHandler.add({
	 * 	"pickup": (args) => {
	 * 		//some code
	 * 	}
	 * });
	 */
	add(commands) {
		if (typeof commands != "object")
			throw new Error("Requires one argument that must be an object");
		for (let prop in commands) {
			if (typeof commands[prop] != "function")
				throw new Error("Command value in key value pair must be a function");
			this.commands[prop] = commands[prop];
		}
	}
	/**
	 * Removes commands from the handler list
	 * @param {...String} commands - Strings denoting the key of each command
	 * @public
	 * @example
	 * myCommandHandler.remove("pickup", "drop", "attack");
	 */
	remove(...commands) {
		for (var i = commands.length - 1; i >= 0; i--) {
			delete this.commands[commands[i]];
		}
	}
	/**
	 * Evaluates a Discord message and executes the appropriate command
	 * @private
	 * @async
	 * @param {Message} message 
	 */
	async _evalCommand(message) {
		let command = message.content.split(this.world.botPrefix)[1].split(" ")[0];
		let args = message.content.split(this.world.botPrefix)[1].split(" ").splice(1);
		await message.delete();
		try {
			await this.commands[command](args);
		} catch (error) {
			console.log(error);
		}
	}
}

module.exports = CommandHandler;