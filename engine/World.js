var Collection = require("./Collection");
var Discord = require("discord.js");
var EventEmitter = require("events");
var Utility = require("./Utility");
var ClassCreationError = require("./ClassCreationError");

class World extends EventEmitter {
	constructor(options) {
		super();
		this.id = Utility.randomID(64);
		this.guild;
		this.bot;
		if (!Utility.defined(this.botPrefix)) throw new ClassCreationError("No botPrefix specified.");
		this.botPrefix = options.bot.prefix;
		this.name = options.name;
		this.locations = new Collection();
		this.mobs = new Collection();
		this.actions = new Collection();
		this.battles = new Collection();
		this.items = new Collection();
		this._init(options);
	}
	async _init(options) {
		let Bot = new Discord.Client();
		Bot.login(options.bot.token);
		await new Promise((resolve, reject) => {
			Bot.on("ready", () => {
				console.log("Connected");
				console.log("Logged in as: ");
				console.log(Bot.user.username + " - (" + Bot.user.id + ")");
				resolve();
			});
		});
		this.bot = Bot;
		this.guild = Bot.guilds.resolve(options.guild);
		this.emit("ready");
	}
	async generateAll() {
		for (location of this.locations) {
			await location.generate();
		};
		this.emit("generated");
	}
	async ungenerateAll() {
		for (location of this.locations) {
			await location.destroy();
		}
		this.emit("ungenerated");
	}
}

module.exports = World;