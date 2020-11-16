const Base = require("./Base");
const Collection = require("./Collection");
const utility = require("./utility");
const Action = require("./Action");

/**
 * Represents a mob (living entity)
 * @abstract
 * @extends {Base}
 */
class Mob extends Base {
	static MOB_MOVEMENT_ERROR = class MOB_MOVEMENT_ERROR extends Error { };
	static MOB_ACTION_ERROR = class MOB_ACTION_ERROR extends Error { };
	static MOB_CREATION_ERROR = class MOB_CREATION_ERROR extends Error { };
	static MOB_SPAWN_ERROR = class MOB_SPAWN_ERROR extends Error { };
	constructor(world, options) {
		super(world);
		/**
		 * The name of this mob
		 * @public
		 * @type {String}
		 */
		this.name = options.name;
		/**
		 * All the actions that this mob has taken
		 * @public
		 * @type {Collection}
		 */
		this.actions = new Collection(Action);
		/**
		 * The URL of the picture used for icons on embeds relating to this mob
		 * @public
		 * @type {String}
		 */
		this.iconURL = options.iconURL;
		/**
		 * A description of this mob
		 * @public
		 * @type {String}
		 */
		this.description = options.description;
		/**
		 * The number of actions this mob is allowed to take per-round in a battle
		 * @type {Number}
		 * @public
		 * @default 1
		 */
		this.actionsPerRound = options.actionsPerRound ? 1 : options.actionsPerRound;
		/**
		 * The number of actions this mob has taken in the current round (if in a battle)
		 * @public
		 * @type {Number}
		 */
		this.actionsTakenThisRound = 0;
		/**
		 * The location this mob is currently at
		 * @public
		 * @type {Location}
		 */
		this.location = this.world.locations.resolve(options.location);
		/**
		 * The battle this mob is currently in (if any)
		 * @public
		 * @type {Battle}
		 */
		this.battle = this.world.battles.resolve(options.battle);
		/**
		 * Whether or not this mob is currently spawned
		 * @public
		 * @type {Boolean}
		 */
		this.spawned = false;

		this.world.mobs.add(this);
	}
	/**
	 * Spawns this mob into existence
	 * @async
	 * @public
	 * @returns {Promise<void>}
	 */
	async spawn() {
		if (!this.location) throw new MOB_SPAWN_ERROR("A location is required to spawn.");
		await this.location._addMob(this);
		if (this.battle) {
			await this.battle.addMob(this);
		}
		this.spawned = true;
		this.emit("spawned");
	}
	/**
	 * Have this mob take an action
	 * @param  {Action} action - An Action object
	 * @return {Promise<Action>}
	 * @public
	 * @async
	 */
	async action(actionString) {
		if (!this.spawned) throw new MOB_ACTION_ERROR("Cannot perform an action if not spawned");
		if (!actionString) throw new MOB_ACTION_ERROR("Missing required option: actionString");
		let action = new Action(this.world, actionString, {
			mob: this,
			location: this.location
		});
		this.actions.add(action);
		if (this.battle) {
			if (this.battle.mobs.resolve(this) && this.actionsTakenThisRound == this.actionsPerRound) {
				await this.battle._registerAction(action);
			}
		}
		await this.location._registerAction(action);
		await this.emit("actionTaken", action);
		return action;
	}
	/**
	 * Move this mob to a location
	 * @param  {LocationResolvable} locationResolvable - A resolvable of the location to move to
	 * @return {Promise}
	 * @public
	 * @async
	 */
	async move(locationResolvable) {
		let newLocation = this.world.locations.resolve(locationResolvable);
		if (!newLocation) throw new MOB_MOVEMENT_ERROR("Missing required option: locationResolvable");
		if (!this.spawned) throw new MOB_MOVEMENT_ERROR("Cannot move if not spawned");
		let currentLocation = this.location;
		if (currentLocation) {
			if (this.battle)
				await this.battle.removeMob(this);
			this.location = undefined;
			await currentLocation._removeMob(this);
		}
		this.location = newLocation;
		await newLocation._addMob(this);
		await this.emit("changedLocation", currentLocation, newLocation);
	}
}

module.exports = Mob;

/**
 * Emitted when this mob changes locations
 * @event Mob#changedLocation
 * @param {Location} [oldLocation] - Previous location
 * @param {Location} [newLocation] - New location
 */

/**
 * Emitted when this mob takes an action
 * @event Mob#actionTaken
 * @param {Action} [action] - The action that was taken
 */