const Base = require("./Base");
const utility = require("./utility");
const Action = require("./Action");
const { GuildMember } = require("discord.js");
const CommandHandler = require("./CommandHandler");
const Mob = require("./Mob");

/**
 * Represents a player
 * @extends {Mob}
 * @public
 * @param  {World} world - The world to create the player in
 * @param  {Object} options - The options to create the player with
 */
class Player extends Mob {
	static PLAYER_CREATION_ERROR = class PLAYER_CREATION_ERROR extends Error { };
	constructor(world, options) {
		if (!options.guildMember)
			throw new PLAYER_CREATION_ERROR("No guildMember object specified.");

		super(world, options);
		/**
		 * The GuildMember that this player is attached to
		 * @public
		 * @type {GuildMember}
		 */
		this.guildMember = this.guild.members.resolve(options.guildMember);
		/**
		 * The commandHandler for this player (The provided condition is that the message author must match this player's guildMember)
		 * @public
		 * @type {CommandHandler}
		 */
		this.commandHandler = new CommandHandler(this.world, {
			commands: {
				"a": async (args) => {
					await this.action(args.join(" "));
				}
			},
			condition: message => message.member.id === this.guildMember.id && this.spawned
		});

		this.on("changedLocation", async (oldLocation, newLocation) => {
			if (oldLocation) {
				if (oldLocation.generated)
					await this.guildMember.roles.remove(oldLocation.role);
			}
			if (newLocation) {
				if (newLocation.generated) {
					await this.guildMember.roles.add(newLocation.role);
					if (this.guildMember.voice.channel != undefined)
						await this.guildMember.voice.setChannel(newLocation.voiceChannel);
				}
			}
		});
	}
}

module.exports = Player;