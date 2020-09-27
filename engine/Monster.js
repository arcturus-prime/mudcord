const Mob = require("./Mob");
const Utility = require("./Utility");

/**
 * Represents a monster (a non-player-controlled mob)
 * @extends {Mob}
 * @param  {World} world - The world to create this monster in
 * @param  {Object} options - The options to create this monster with
 */
class Monster extends Mob {
	constructor(world, options) {
		super(world, options);
	}
}

module.exports = Monster;