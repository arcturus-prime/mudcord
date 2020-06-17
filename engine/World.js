var Collection = require("./Collection");
var Discord = require("discord.js");
var AsyncEventEmitter = require('asynchronous-emitter');
var Utility = require("./Utility");
var Location = require("./Location");
var Mob = require("./Mob");
var Action = require("./Action");
var Battle = require("./Battle");
var Item = require("./Item");

class World extends AsyncEventEmitter {
	constructor(options) {
		super();
		this.id = Utility.randomID(18);
		this.guild;
		this.bot;
		if (!Utility.defined(options.bot.prefix)) throw new Error("No prefix specified in bot object.");
		this.botPrefix = options.bot.prefix;
		this.botToken = options.bot.token;
		this.guild = options.guild;
		this.name = options.name;
		this.locations = new Collection(Location);
		this.mobs = new Collection(Mob);
		this.actions = new Collection(Action);
		this.battles = new Collection(Battle);
		this.items = new Collection(Item);
	}
	async init() {
		let Bot = new Discord.Client();
		Bot.login(this.botToken);
		await new Promise((resolve, reject) => {
			Bot.on("ready", () => {
				console.log("Connected");
				console.log("Logged in as: ");
				console.log(Bot.user.username + " - (" + Bot.user.id + ")");
				resolve();
			});
		});
		this.bot = Bot;
		this.guild = Bot.guilds.resolve(this.guild);
	}
	async generateAll() {
		for (location of this.locations) {
			await location[1].generate();
		};
		await this.emit("generated");
	}
	async ungenerateAll() {
		for (location of this.locations) {
			await location[1].ungenerate();
		}
		await this.emit("ungenerated");
	}
}

module.exports = World;