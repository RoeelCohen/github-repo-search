/**
 * capitalizing the first letter of a string: 'string' -> 'String'
 */
String.prototype.capitalize = function capitalize() {
	return this.charAt(0).toUpperCase() + this.slice(1);
};
