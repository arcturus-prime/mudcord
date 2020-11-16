const Base = require("./Base");
const Player = require("./Player");
const Collection = require("./Collection");
const utility = require("./utility");
const Mob = require("./Mob");
const Action = require("./Action");
const { Message, VoiceChannel } = require("discord.js");

/**
 * Represents a location
 * @extends {Base}
 * @public
 * @param {World} world
 * @param {Object} options
 */
class Location extends Base {
	static LOCATION_GENERATION_ERROR = class LOCATION_GENERATION_ERROR extends Error { };
	static LOCATION_UNGENERATION_ERROR = class LOCATION_UNGENERATION_ERROR extends Error { };
	static LOCATION_ATTACHMENT_ERROR = class LOCATION_ATTACHMENT_ERROR extends Error { };
	static LOCATION_NARRATION_ERROR = class LOCATION_NARRATION_ERROR extends Error { };
	constructor(world, options = {}) {
		if (!options.name) options.name = "A Location";

		super(world);

		this.battle = null;
		/**
		 * Indicates whether this location has been generated
		 * @public
		 * @type {Boolean}
		 */
		this.generated = false;
		/**
		 * All mobs currently at this location
		 * @public
		 * @type {Collection<Mob>}
		 */
		this.mobs = new Collection(Mob);
		/**
		 * All actions taken at this location
		 * @public
		 * @type {Collection<Action>}
		 */
		this.actions = new Collection(Action);
		/**
		 * The role associated with this location
		 * @public
		 * @type {Role}
		 */
		this.role = null;
		/**
		 * The category associated with this location
		 * @public
		 * @type {CategoryChannel}
		 */
		this.category = null;
		/**
		 * The text channel associated with this location
		 * @public
		 * @type {TextChannel}
		 */
		this.textChannel = null;
		/**
		 * The voice channel associated with this location
		 * @public
		 * @type {VoiceChannel}
		 */
		this.voiceChannel = null;
		/**
		 * The channel used as a separator between the button channels and the voice/text channels
		 * @public
		 * @type {TextChannel}
		 */
		this.spacerChannel = null;
		/**
		 * The name of the location
		 * @public
		 * @type {String}
		 */
		this.name = options.name;
		/**
		 * Any and all locations attached to this location
		 * @public
		 * @type {Collection<Location>}
		 */
		this.locations = new Collection(Location);
		/**
		 * Contains all the voice channel buttons for moving between locations
		 * @public
		 * @type {Collection<VoiceChannel>}
		 */
		this.buttons = new Collection(VoiceChannel);
		this.world.locations.add(this);
	}
	/**
	 * Creates the role and channels for this location and links the associated locations to the newly created button channels
	 * @async
	 * @public
	 * @returns {Promise<void>}
	 */
	async generate() {
		if (this.generated)
			throw new LOCATION_GENERATION_ERROR("Location must not be generated to be generated");
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
		});
		this.textChannel = await this.guild.channels.create("text", {
			type: "text",
			parent: this.category,
			position: 1
		});
		this.voiceChannel = await this.guild.channels.create("voice", {
			type: "voice",
			parent: this.category,
			position: 2
		});
		if (this.locations.size > 0) {
			this.spacerChannel = await this.guild.channels.create("──────────────", {
				type: "voice",
				parent: this.category,
				permissionOverwrites: [{
					id: this.role,
					allow: ["VIEW_CHANNEL"],
					deny: ["SEND_MESSAGES", "CONNECT", "SPEAK"]
				}, {
					id: this.guild.roles.everyone,
					deny: ["SEND_MESSAGES", "CONNECT", "SPEAK", "VIEW_CHANNEL"]
				}],
				position: 3
			});
		}
		for (let location of this.locations) {
			await this._addLocationButton(location[1]);
		}
		this.generated = true;
		await this.emit("generated");
	}
	/**
	 * Reverses the effects of the `generate()` method
	 * @async
	 * @public
	 * @returns {Promise<void>}
	 */
	async ungenerate() {
		if (!this.generated) throw new LOCATION_UNGENERATION_ERROR("Location must be generated to ungenerate");
		for (let button of this.buttons) {
			await button[1].delete();
		}
		await this.textChannel.delete();
		await this.voiceChannel.delete();
		if (this.spacerChannel) await this.spacerChannel.delete();
		await this.category.delete();
		await this.role.delete();
		this.generated = false;
		await this.emit("ungenerated");
	}
	/**
	 * Registers an action at this location
	 * @async
	 * @private
	 * @param {Action} action 
	 * @returns {Promise<void>}
	 */
	async _registerAction(action) {
		action.location = this;
		this.actions.add(action);
		await this.textChannel.send({
			embed: {
				author: {
					name: action.mob.name,
					iconURL: action.mob.iconURL
				},
				description: action.actionString
			}
		});
		await this.emit("actionTaken", action);
	}
	/**
	 * Adds a VoiceChannel button for a location to this location
	 * @async
	 * @private
	 * @param {Location} location
	 * @returns {Promise<void>}
	 */
	async _addLocationButton(location) {
		let button = await this.guild.channels.create(location.name, {
			type: "voice",
			parent: this.category,
			permissionOverwrites: [{
				id: this.role,
				allow: ["VIEW_CHANNEL", "CONNECT"],
				deny: ["SPEAK"]
			}, {
				id: this.guild.roles.everyone,
				deny: ["SEND_MESSAGES", "CONNECT", "SPEAK", "VIEW_CHANNEL"]
			}],
			position: this.category.children.size + 1
		});
		this.buttons.add(button);
		let world = location.world;
		let voiceStateFunc = async (oldState, newState) => {
			if (button.deleted)
				return;
			if (newState.channel == location.guild.channels.resolve(button)) {
				for (let mob of world.mobs) {
					if (mob[1] instanceof Player) {
						if (newState.member == world.guild.members.resolve(mob[1].guildMember)) {
							mob[1].location = location;
						}
					}
				}
			}
		};
		world.bot.on("voiceStateUpdate", voiceStateFunc);
		return button;
	}
	/**
	 * Adds a mob to this location
	 * @async
	 * @private
	 * @param {MobResolvable} mobResolvable 
	 * @returns {Promise<void>}
	 */
	async _addMob(mobResolvable) {
		let mob = this.world.mobs.resolve(mobResolvable);
		this.mobs.add(mob);
		if (this.generated) {
			await this.textChannel.send({
				embed: {
					description: `${mob.name} enters.`
				}
			});
		}
		await this.emit("mobJoined", mob);
	}
	/**
	 * Removes a mob from this location
	 * @async
	 * @private
	 * @param {MobResolvable} mobResolvable 
	 * @returns {Promise<void>}
	 */
	async _removeMob(mobResolvable) {
		let mob = this.world.mobs.resolve(mobResolvable);
		this.mobs.remove(mob);
		if (this.generated) {
			await this.textChannel.send({
				embed: {
					description: `${mob.name} leaves.`
				}
			});
		}
		await this.emit("mobLeft", mob);
	}
	/**
	 * Places a location next to this one
	 * @param {LocationResolvable} locationResolvable - The location to attach
	 * @async
	 * @public
	 * @returns {Promise<void>}
	 */
	async attach(locationResolvable) {
		if (!locationResolvable) throw new LOCATION_ATTACHMENT_ERROR('Requires a location.');
		let location = this.world.locations.resolve(locationResolvable);
		this.locations.add(location);
		if (this.generated) {
			await this._addLocationButton(location);
		}
		await this.emit("locationAttached", location);
	}
	/**
	 * Sends a narration message to the `textChannel` property channel
	 * @param {String} message - The message text
	 * @async
	 * @public
	 * @returns {Promise<Message>}
	 */
	async narrate(message) {
		if (!this.generated) throw new LOCATION_NARRATION_ERROR('Location not generated.');
		if (!message) throw new Error('Requires a string.');
		let actualMessage = await this.textChannel.send({
			embed: {
				description: message
			}
		});
		await this.emit("narration", actualMessage);
		return actualMessage;
	}
}

module.exports = Location;

/**
 * Emitted when this location is generated
 * @event Location#generated
 */

/**
 * Emitted when this location is ungenerated
 * @event Location#ungenerated
 */

/**
 * Emitted when another location is attached to this one
 * @event Location#locationAttached
 * @param {Location} [location]
 */

/**
 * Emitted when a narration message is sent
 * @event Location#narration
 * @param {Message} [message]
 */

/**
 * Emitted when an action is taken at this location
 * @event Location#actionTaken
 * @param {Action} [action] - The action that was taken
 */

/**
 * Emitted when a mob leaves this location
 * @event Location#mobLeft
 * @param {Mob} [mob] - The mob that left this location
 */

/**
 * Emitted when a mob joins this location
 * @event Location#mobJoined
 * @param {Mob} [mob] - The mob that joined this location
 */