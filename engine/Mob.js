const Base = require("./Base");
const Collection = require("./Collection");
const Utility = require("./Utility");
const Item = require("./Item");
const Action = require("./Action");

/**
 * Represents a mob (living entity)
 * @extends Base
 */
class Mob extends Base {
	constructor(world, options) {
		super(world);
		/**
		 * The name of this mob
		 * @type {String}
		 */
		this.name = options.name;
		/**
		 * All the actions that this mob has taken
		 * @type {Collection}
		 */
		this.actions = new Collection(Action);
		/**
		 * All the items that this mob possesses
		 * @type {Collection}
		 */
		this.items = new Collection(Item);
		/**
		 * The URL of the picture used for icons on embeds relating to this mob
		 * @type {String}
		 */
		this.iconURL = options.iconURL;
		/**
		 * A description of this mob
		 * @type {String}
		 */
		this.description = options.description;
		/**
		 * The number of actions this mob is allowed to take per-round in a battle
		 * @type {Number}
		 * @default 1
		 */
		this.actionsPerRound = options.actionsPerRound ? 1 : options.actionsPerRound;
		/**
		 * The number of actions this mob has taken in the current round (if in a battle)
		 * @type {Number}
		 */
		this.actionsTakenThisRound = 0;
		/**
		 * The location this mob is currently at
		 * @type {Location}
		 */
		this.location = this.world.locations.resolve(options.location);
		/**
		 * The battle this mob is currently in (if any)
		 * @type {Battle}
		 */
		this.battle = this.world.battles.resolve(options.battle);
	}
	/**
	 * Spawns this mob into its location
	 * @async
	 * @returns {Promise<void>}
	 */
	async spawn() {
		if(!this.location) throw new Error("A location is required to spawn.");
		await this.move(this.location);
		if (this.battle)
			await this.battle.addMob(this);
	}
	/**
	 * Have this mob take an action
	 * @param  {Action} action - An Action object
	 * @return {Promise<Action>}
	 * @async
	 */
	async action(actionString) {
		if (!actionString)
			throw new Error("Missing required option: actionString");
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
	 * @async
	 */
	async move(locationResolvable) {
		let newLocation = this.world.locations.resolve(locationResolvable);
		if (!newLocation)
			throw new Error("Missing required option: locationResolvable");
		let currentLocation = this.location;
		if (currentLocation) {
			if (this.battle)
				await this.battle.removeMob(this);
			currentLocation.mobs.remove(this);
			this.location = undefined;
			for (let item of this.items) {
				item[1].location.items.remove(item[1]);
				item[1].location = undefined;
			}
			if (currentLocation.generated) {
				await currentLocation.textChannel.send({
					embed: {
						description: `${this.name} leaves.`
					}
				});
			}
			await currentLocation.emit("mobLeft", this);
		}
		newLocation.mobs.add(this);
		this.location = newLocation;
		for (let item of this.items) {
			item[1].location.items.add(item[1]);
			item[1].location = newLocation;
		}
		if (newLocation.generated) {
			await newLocation.textChannel.send({
				embed: {
					description: `${this.name} enters.`
				}
			});
		}
		await newLocation.emit("mobJoined", this);
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