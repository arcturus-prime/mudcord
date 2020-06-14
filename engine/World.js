var Collection = require("./Collection");
var Discord = require("discord.js");
var EventEmitter = require("events");
var Utility = require("./Utility");
var ClassCreationError = require("./ClassCreationError");
var Location = require("./Location");
var Mob = require("./Mob");
var Action = require("./Action");
var Battle = require("./Battle");
var Item = require("./Item");

class World extends EventEmitter {
	constructor(options) {
		super();
		this.id = Utility.randomID(18);
		this.guild;
		this.bot;
		if (!Utility.defined(options.bot.prefix)) throw new ClassCreationError("No prefix specified in bot object.");
		this.botPrefix = options.bot.prefix;
		this.name = options.name;
		this.locations = new Collection(Location);
		this.mobs = new Collection(Mob);
		this.actions = new Collection(Action);
		this.battles = new Collection(Battle);
		this.items = new Collection(Item);
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
		for (let location of this.locations) {
			await location[1].generate();
		};
		this.emit("generated");
	}
	async ungenerateAll() {
		for (let location of this.locations) {
			await location[1].destroy();
		}
		this.emit("ungenerated");
	}
}

module.exports = World;