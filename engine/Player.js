var Base = require("./Base");
var Manager = require("./Manager");
var Utility = require("./Utility");
var Action = require("./Action");
var CommandHandler = require("./CommandHandler");
var Mob = require("./Mob");
var ClassCreationError = require("./ClassCreationError");

class Player extends Mob {
	constructor(world, options) {
		super(world, {
			location: options.location,
			name: options.name,
			battle: options.battle,
			iconURL: options.iconURL,
			actionsPerRound: options.actionsPerRound
		});
		if (!Utility.defined(this.guildMember)) throw new ClassCreationError("No guildMember object specified.");
		this.guildMember = this.guild.members.resolve(options.guildMember);

		//Command handler setup
		this.commandHandler = new CommandHandler(this.world, {
			commands: {
				"a": async (args) => {
					this.takeAction(new Action(this.world, {
						mob: this,
						location: this.location
						actionString: args.join(" ")
					}));
				}
			},
			_this: this,
			condition: message => message.member.id === this.guildMember.id
		});
		this._init()
	}
	_init() {
		this.on("changedLocation", async (oldLocation, newLocation) => {
			if (location.generated) {
				await this.guildMember.roles.remove(oldLocation.role);
				await this.guildMember.roles.add(newLocation.role);
				if (this.guildMember.voice.channel != undefined) await this.guildMember.voice.setChannel(newLocation.voiceChannel);
			}
		});
	}
}

module.exports = Player;