const crypto = require('crypto');

let utility = {};
/**
	 * An async function that resolves its promise after a specified number of milliseconds
	 * @param  {Number} time - The amount of time to delay (in milliseconds)
	 * @return {Promise}
	 * @static
	 */

utility.sleep = function (time) {
	return new Promise((resolve, reject) => {
		setTimeout(resolve, time);
	});
}
/**
 * Creates a random hex string of a specified length
 * @param  {Number} length - The length of the string to be generated
 * @return {String}
 * @static
 */
utility.randomID = function (length) {
	let buffer = crypto.randomBytes(length);
	let bufferHexString = buffer.toString("hex");
	return bufferHexString;
}

module.exports = utility;