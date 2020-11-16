const Mob = require("./Mob");
const utility = require("./utility");

/**
 * Represents a monster (a non-player-controlled mob)
 * @extends {Mob}
 * @public
 * @param  {World} world - The world to create this monster in
 * @param  {Object} options - The options to create this monster with
 */
class Monster extends Mob {
	constructor(world, options) {
		super(world, options);
	}
}

module.exports = Monster;