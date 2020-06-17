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
		this._generated = false;
		this._mobs = new Collection(Mob);
		this._actions = new Collection(Action);
		this._items = new Collection(Item);
		this._battles = new Collection(Battle);
		this._role;
		this._category;
		this._textChannel;
		this._voiceChannel;
		this._spacerChannel;
		this.name = options.name;
		this._north = options.north;
		this._south = options.south;
		this._east = options.east;
		this._west = options.west;
		this._up = options.up;
		this._down = options.down;
		this._buttonNorth;
		this._buttonSouth;
		this._buttonEast;
		this._buttonWest;
		this._buttonUp;
		this._buttonDown;
	}
	//Controlling object access
	get guild() {
		return this.world.guild;
	}
	get generated() {
		return this._generated;
	}
	get mobs() {
		return this._mobs
	}
	get actions() {
		return this._actions;
	}
	get items() {
		return this._items;
	}
	get battles() {
		return this._battles;
	}
	get role() {
		return this._role;
	}
	get category() {
		return this._category;
	}
	get textChannel() {
		return this._textChannel;
	}
	get voiceChannel() {
		return this._voiceChannel;
	}
	get spacerChannel() {
		return this._spacerChannel;
	}
	get up() {
		return this._up;
	}
	get down() {
		return this._down;
	}
	get east() {
		return this._east;
	}
	get west() {
		return this._west;
	}
	get south() {
		return this._south;
	}
	get north() {
		return this._north;
	}
	get buttonUp() {
		return this._buttonUp;
	}
	get buttonDown() {
		return this._buttonDown;
	}
	get buttonEast() {
		return this._buttonEast;
	}
	get buttonWest() {
		return this._buttonWest;
	}
	get buttonSouth() {
		return this._buttonSouth;
	}
	get buttonNorth() {
		return this._buttonNorth;
	}
	//"build" function
	async init() {
		this.world.locations.add(this);
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
		for (mob of this.mobs) {
			if (mob[1] instanceof Player) {
				await mob[1].guildMember.roles.add(this.role);
				if (mob[1].guildMember.voice.speaking != null) {
					await mob.[1]guildMember.voice.setChannel(this.voiceChannel);
				}
				await this.textChannel.send({
					embed: {
						description: `${mob[1].name} enters.`
					}
				});
			}
		}
		this.generated = true;
		await this.emit("generated");
		if (Utility.defined(this.north)) await this.attach(this.north, "north");
		if (Utility.defined(this.south)) await this.attach(this.south, "south");
		if (Utility.defined(this.west)) await this.attach(this.west, "west");
		if (Utility.defined(this.east)) await this.attach(this.east, "east");
		if (Utility.defined(this.down)) await this.attach(this.down, "down");
		if (Utility.defined(this.up)) await this.attach(this.up, "up");
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
		this.generated = false;
		await this.emit("ungenerated");
	}
	async attach(location, direction) {
		if (!Utility.defined(location) || !Utility.defined(direction)) {
			throw new Error(`Requires two arguments`);
		}
		switch (direction) {
			case "north":
			case "south":
			case "east":
			case "west":
			case "up":
			case "down":
				break;
			default:
				throw new Error(`Invalid direction ${direction}`);
		}
		this[`_${direction}`] = this.world.locations.resolve(location);
		if (this.generated && Utility.defined(this[`_${direction}`])) {
			let buttonString = `_button${direction.charAt(0).toUpperCase() + string.slice(1)}`;
			if (Utility.defined(this[buttonString])) await this[buttonString].delete();
			if (location === null) return;
			this[buttonString] = await this.guild.channels.create(this.north.name, {
				type: "voice",
				parent: this.category,
				position: 4
			});
			await Location.bindVCButtonToLocation(this[buttonString], this[`_${direction}`]);
		}
	}
	async message(message) {
		if (!this.generated) throw new Error(`Location not generated`);
		if (!Utility.defined(message)) throw new Error(`Requires one argument`);
		await this.textChannel.send({
			embed: {
				description: message
			}
		});
	}
	delete() {
		this.mobs.remove();
		this.items.remove();
		this.actions.remove();
		this.battles.remove();
		await this.up.attach(null, "down");
		await this.down.attach(null, "up");
		await this.east.attach(null, "west");
		await this.west.attach(null, "east");
		await this.south.attach(null, "north");
		await this.north.attach(null, "south");
		this.world.locations.remove(this);
	}
	static async bindVCButtonToLocation(voiceChannel, location) {
		if (!Utility.defined(location) || !Utility.defined(voiceChannel)) {
			throw new Error(`Requires two arguments`);
		}
		let world = location.world;
		let voiceStateFunc = async (oldState, newState) => {
			if (voiceChannel.deleted) return;
			if (newState.channel == location.guild.channels.resolve(voiceChannel)) {
				for (mob of world.mobs) {
					if (mob[1] instanceof Player) {
						if (newState.member == world.guild.members.resolve(mob[1].guildMember)) {
							mob[1].location = location;
						}
					}
				}
			}
		};
		world.bot.on("voiceStateUpdate", voiceStateFunc);

	}
}

module.exports = Location;