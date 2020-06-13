var Base = require("./Base");
var ClassCreationError = require("./ClassCreationError");
var Utility = require("./Utility");

class CommandHandler extends Base {
	constructor(world, options) {
		super(world)
		if (!Utility.defined(options.commands)) throw new ClassCreationError("No commands object specified.")
		this.commands = options.commands;
		if (!Utility.defined(options._this)) throw new ClassCreationError("No _this object specified.")
		this._this = options._this;
		this.world.bot.on("message", async (message) => {
			if (options.condition(message) && message.content.startsWith(this.world.botPrefix)) {
				await this.eval(message);
			}
		})
	}
	async eval(message) {
		let command = message.content.split(this.world.botPrefix)[1].split(" ")[0];
		let args = message.content.split(this.world.botPrefix)[1].split(" ").splice(1);
		await message.delete();
		try {
			await this.commands[command].call(this._this, args);
		} catch (error) {
			console.log(error);
		}
	}
}
module.exports = CommandHandler;