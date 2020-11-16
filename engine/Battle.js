const Base = require("./Base");
const Collection = require("./Collection");
const Action = require("./Action");
const utility = require("./utility");
const Mob = require("./Mob");

/**
 * Represents a battle.
 * @extends {Base}
 * @param {World} world - The world to create this battle in
 * @param {Object} options - The options to create this battle with
 */
class Battle extends Base {
	static BATTLE_ACTION_REGISTER_ERROR = class BATTLE_ACTION_REGISTER_ERROR extends Error { };
	static BATTLE_REMOVE_MOB_ERROR = class BATTLE_REMOVE_MOB_ERROR extends Error { };
	static BATTLE_ADD_MOB_ERROR = class BATTLE_ADD_MOB_ERROR extends Error { };
	static BATTLE_START_ERROR = class BATTLE_START_ERROR extends Error { };
	constructor(world, options = {}) {
		super(world);
		/**
		 * The location where this battle is taking place
		 * @type {Location}
		 */
		this.location = this.world.locations.resolve(options.location);
		/**
		 * The name of the battle
		 * @type {String}
		 * @default "A Battle"
		 */
		this.name = !options.name ? "A Battle" : options.name;
		/**
		 * All mobs participating in this battle
		 * @type {Collection<Mob>}
		 */
		this.mobs = new Collection(Mob);
		/**
		 * The current round number of this battle
		 * @type {Number}
		 */
		this.currentRound = 0;
		/**
		 * All actions that have been taken in this battle
		 * @type {Collection<Action>}
		 */
		this.actions = new Collection(Action);
		/**
		 * The amount of time all participating mobs have to perform actions before the round ends
		 * @type {Number}
		 * @default 60000
		 */
		this.roundTimeLimit = !options.roundTimeLimit ? 60000 : options.roundTimeLimit;
		this._currentTimeout;
		/**
		 * Indicates whether the battle has started or not
		 * @type {Boolean}
		 */
		this.started = false;
		this.world.battles.add(this);
	}
	/**
	 * Starts this battle
	 * @async
	 * @public
	 * @returns {Promise<void>}
	 */
	async start() {
		if (!this.location) throw new BATTLE_START_ERROR("A location is required to start this battle.");
		this.location.battle = this;
		await this.location.textChannel.send({
			embed: {
				title: "A battle has begun!"
			}
		});
		this._currentTimeout = setTimeout(this._endRound.bind(this), this.roundTimeLimit);
		this.started = true;
		await this.emit("started");
	}
	/**
	 * Adds a mob to this battle
	 * @async
	 * @public
	 * @param {MobResolvable} mobResolvable
	 * @returns {Promise<void>}
	 */
	async addMob(mobResolvable) {
		let mob = this.world.mobs.resolve(mobResolvable);
		if (!mob) throw new BATTLE_ADD_MOB_ERROR("Missing required option: mobResolvable");
		if (mob.location != this.location) await mob.move(this.location);
		this.mobs.add(mob);
		mob.battle = this;
		if (this.started) {
			await this.location.textChannel.send({
				embed: {
					author: {
						name: mob.name,
						iconURL: mob.iconURL
					},
					description: `joined the battle.`
				}
			});
		}
		await this.emit("mobJoined", mob);
	}
	/**
	 * Removes a mob from this battle
	 * @async
	 * @public
	 * @param {MobResolvable} mobResolvable
	 * @returns {Promise<void>}
	 */
	async removeMob(mobResolvable) {
		let mob = this.world.mobs.resolve(mobResolvable);
		if (!mob) throw new BATTLE_REMOVE_MOB_ERROR("Missing required option: mobResolvable");
		this.mobs.remove(mob);
		mob.battle = undefined;
		if (this.started) {
			await this.location.textChannel.send({
				embed: {
					author: {
						name: mob.name,
						iconURL: mob.iconURL
					},
					description: `left the battle.`
				}
			});
		}
		await this.emit("mobLeft", mob);
	}
	/**
	 * Ends this battle
	 * @async
	 * @public
	 * @returns {Promise<void>}
	 */
	async end() {
		clearTimeout(this._currentTimeout);
		for (let mob of this.mobs) {
			mob[1].battle = null;
		}
		this.location.battle = null;
		await this.location.textChannel.send({
			embed: {
				title: "A battle has ended."
			}
		});
		this.started = false;
		await this.emit("end");
	}
	/**
	 * @private
	 * @param {Action} action 
	 * @async
	 * @returns {Promise<Boolean>}
	 */
	async _registerAction(action) {
		if (action.mob.actionsTakenThisRound == action.mob.actionsPerRound) throw new BATTLE_ACTION_REGISTER_ERROR("Mob has already taken all their actions this round");
		action.battle = this;
		this.actions.add(action);
		action.mob.actionsTakenThisRound++;
		await this.emit("actionTaken", action);
		if (this.mobs.every((value, key, map) => value.actionsTakenThisRound == value.actionsPerRound)) {
			await this._endRound();
		}
		return true;
	}
	/**
	 * @private
	 * @async
	 * @returns {Promise<void>}
	 */
	async _endRound() {
		clearTimeout(this._currentTimeout);
		for (let mob of this.mobs) {
			mob[1].takenActionThisRound = false;
		}
		this.currentRound++;
		await this.emit("roundEnd");
		this._currentTimeout = setTimeout(this._endRound.bind(this), this.roundTimeLimit);
	}
}

module.exports = Battle;

/**
 * Emitted when a round has ended
 * @event Battle#roundEnd
 */

/**
 * Emitted when an action is taken
 * @event Battle#actionTaken
 * @param {Action} action
 */

/**
 * Emitted when a mob joins this battle
 * @event Battle#mobJoined
 * @param {Mob} mob
 */

/**
 * Emitted when a mob leaves this battle
 * @event Battle#mobLeft
 * @param {Mob} mob
 */

/**
 * Emitted when this battle starts
 * @event Battle#started
 */