var Base = require("./Base");
var Player = require("./Player");
var Collection = require("./Collection");
var Utility = require("./Utility");
var Mob = require("./Mob");
var Action = require("./Action");
var Item = require("./Item");
var Battle = require("./Battle");

class Location extends Base {
	constructor(world, options) {
		super(world);
		this.generated = false;
		this.mobs = new Collection(Mob);
		this.actions = new Collection(Action);
		this.items = new Collection(Item);
		this.battles = new Collection(Battle);
		this.role;
		this.category;
		this.textChannel;
		this.voiceChannel;
		this.spacerChannel;
		this.name = options.name;
		this._north;
		this._south;
		this._east;
		this._west;
		this._up;
		this._down;
		this.north = options.north;
		this.buttonNorth;
		this.south = options.south;
		this.buttonSouth;
		this.east = options.east;
		this.buttonEast;
		this.west = options.west;
		this.buttonWest;
		this.up = options.up;
		this.buttonUp;
		this.down = options.down;
		this.buttonDown;
		this._init();
	}
	_init() {
		this.world.locations.add(this);
		this.mobs.on("add", (mob) => {
			mob.location = this;
			this.emit("mobEntered", mob);
		});
		this.mobs.on("remove", (mob) => {
			mob.location = undefined;
			this.emit("mobLeft", mob);
		});
		this.battles.on("add", (battle) => {
			if(!Utility.exists(battle.locations.resolve(this))) battle.locations.add(this);
		});
		this.battles.on("remove", (battle) => {
			if(Utility.exists(battle.locations.resolve(this))) battle.locations.remove(this);
		});
		this.actions.on("add", (action) => {
			action.location = this;
			this.emit("actionTaken", action);
		});
	}
	//getters and setters
	get guild() {
		return this.world.guild;
	}
	get up() {
		return this._up;
	}
	set up(locationResolvable) {
		this._up = this.world.locations.resolve(locationResolvable);
	}
	get down() {
		return this._down;
	}
	set down(locationResolvable) {
		this._down = this.world.locations.resolve(locationResolvable);
	}
	get east() {
		return this._east;
	}
	set east(locationResolvable) {
		this._east = this.world.locations.resolve(locationResolvable);
	}
	get west() {
		return this._west;
	}
	set west(locationResolvable) {
		this._west = this.world.locations.resolve(locationResolvable);
	}
	get south() {
		return this._south;
	}
	set south(locationResolvable) {
		this._south = this.world.locations.resolve(locationResolvable);
	}
	get north() {
		return this._north;
	}
	set north(locationResolvable) {
		this._north = this.world.locations.resolve(locationResolvable);
	}

	//methods
	async generate() {
		this.role = await this.guild.roles.create({
			data: {
				name: this.name
			}
		});
		this.category = await this.guild.channels.create(this.name, {
			type: "category",
			permissionOverwrites: [{
				id: this.role,
				allow: ["SEND_MESSAGES", "VIEW_CHANNEL", "CONNECT", "SPEAK"],
				deny: ["READ_MESSAGE_HISTORY", "EMBED_LINKS", "ATTACH_FILES", "USE_EXTERNAL_EMOJIS", "SEND_TTS_MESSAGES", "ADD_REACTIONS"]
			}, {
				id: this.guild.roles.everyone,
				deny: ["SEND_MESSAGES", "VIEW_CHANNEL", "CONNECT"]
			}]
		})
		this.textChannel = await this.guild.channels.create("text", {
			type: "text",
			parent: this.category,
			position: 1
		})
		this.voiceChannel = await this.guild.channels.create("voice", {
			type: "voice",
			parent: this.category,
			position: 2
		})
		if (Utility.defined(this.north) || Utility.defined(this.south) || Utility.defined(this.east) || Utility.defined(this.west) || Utility.defined(this.up) || Utility.defined(this.down)) {
			this.spacerChannel = await this.guild.channels.create("──────────────", {
				type: "voice",
				parent: this.category,
				permissionOverwrites: [{
					id: this.role,
					allow: [, "VIEW_CHANNEL"],
					deny: ["SEND_MESSAGES", "CONNECT", "SPEAK"]
				}, {
					id: this.guild.roles.everyone,
					deny: ["SEND_MESSAGES", "CONNECT", "SPEAK", "VIEW_CHANNEL"]
				}],
				position: 3
			})
		}
		if (Utility.defined(this.north)) {
			this.buttonNorth = await this.guild.channels.create(this.north.name, {
				type: "voice",
				parent: this.category,
				position: 4
			});
			await Location.bindVCButtonToLocation(this.buttonNorth, this.north);
		}
		if (Utility.defined(this.south)) {
			this.buttonSouth = await this.guild.channels.create(this.south.name, {
				type: "voice",
				parent: this.category,
				position: 5
			});
			await Location.bindVCButtonToLocation(this.buttonSouth, this.south);
		}
		if (Utility.defined(this.east)) {
			this.buttonEast = await this.guild.channels.create(this.east.name, {
				type: "voice",
				parent: this.category,
				position: 6
			});
			await Location.bindVCButtonToLocation(this.buttonEast, this.east);
		}
		if (Utility.defined(this.west)) {
			this.buttonWest = await this.guild.channels.create(this.west.name, {
				type: "voice",
				parent: this.category,
				position: 7
			});
			await Location.bindVCButtonToLocation(this.buttonWest, this.west);
		}
		if (Utility.defined(this.up)) {
			this.buttonUp = await this.guild.channels.create(this.up.name, {
				type: "voice",
				parent: this.category,
				position: 8
			});
			await Location.bindVCButtonToLocation(this.buttonUp, this.up);
		}
		if (Utility.defined(this.down)) {
			this.buttonDown = await this.guild.channels.create(this.down.name, {
				type: "voice",
				parent: this.category,
				position: 9
			});
			await Location.bindVCButtonToLocation(this.buttonDown, this.down);
		}
		for (let x in this.mobs.contents) {
			if (this.mobs.contents[x] instanceof Player) {
				this.mobs.contents[x].guildMember.roles.add(this.role);
				if (this.mobs.contents[x].guildMember.voice.speaking != null) {
					await this.mobs.contents[x].guildMember.voice.setChannel(this.voiceChannel);
				}
				await this.textChannel.send({
					embed: {
						description: `${this.mobs.contents[x].name} enters.`
					}
				});
			}
		}
		this.generated = true;
		this.emit("generated");
	}
	async ungenerate() {
		if (Utility.defined(this.buttonDown)) await this.buttonDown.delete();
		if (Utility.defined(this.buttonUp)) await this.buttonUp.delete();
		if (Utility.defined(this.buttonWest)) await this.buttonWest.delete();
		if (Utility.defined(this.buttonEast)) await this.buttonEast.delete();
		if (Utility.defined(this.buttonSouth)) await this.buttonSouth.delete();
		if (Utility.defined(this.buttonNorth)) await this.buttonNorth.delete();
		await this.textChannel.delete();
		await this.voiceChannel.delete();
		if (Utility.defined(this.spacerChannel)) await this.spacerChannel.delete();
		await this.category.delete();
		await this.role.delete();
		this.emit("ungenerated");
		this.generated = false;
	}
	delete() {
		this.world.locations.remove(this);
	}
	async message(message) {
		if (!this.generated) return;
		await this.textChannel.send({
			embed: {
				description: message
			}
		});
	}
	static async bindVCButtonToLocation(voiceChannel, location) {
		if (!Utility.defined(location)) {
			return;
		}
		let world = location.world;
		world.bot.on("voiceStateUpdate", async (oldState, newState) => {
			if (newState.channel == location.guild.channels.resolve(voiceChannel)) {
				for (mob of world.mobs) {
					if (mob instanceof Player) {
						if (newState.member == world.guild.members.resolve(mob.guildMember)) {
							mob.location = location;
						}
					}
				}
			}
		})
	}
}

module.exports = Location;