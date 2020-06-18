var Mob = require("./Mob");
var Utility = require("./Utility");

class Monster extends Mob {
	constructor(world, options) {
		super(world, {
			location: options.location,
			name: options.name,
			description: options.description,
			battle: options.battle,
			iconURL: options.iconURL,
			actionsPerRound: options.actionsPerRound
		});
		if (Utility.defined(options.playerOwner)) throw new Error("No playerOwner object specified.")
		this.playerOwner = this.world.mobs.resolve(options.playerOwner);
		this._commandHandler;
	}

	get commandHandler() {
		return this._commandHandler;
	}

	async init() {
		await super.init()
		this._commandHandler = new CommandHandler(this.world, {
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