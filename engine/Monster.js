var Mob = require("./Mob");
var Utility = require("./Utility");
var ClassCreationError = require("./ClassCreationError");

class Monster extends Mob {
	constructor(world, options) {
		super(world, {
			location: options.location,
			name: options.name,
			battle: options.battle,
			iconURL: options.iconURL
		});
		if (Utility.defined(this.playerOwner)) throw new ClassCreationError("No playerOwner object specified.")
		this.playerOwner = this.world.mobs.resolve(options.playerOwner);

		//Command handler setup
		this.commandHandler = new CommandHandler(this.world, {
			commands: {
				"ma": async (args) => {
					if (args[0] == this.id) {
						this.takeAction(new Action(this.world, {
							mob: this,
							location: this.location,
							actionString: args.splice(1).join(" ")
						}));
					}
				}
			},
			_this: this,
			condition: message => message.member == this.playerOwner.guildMember
		});
	}
}
module.exports = Monster;