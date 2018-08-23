// Require Internal Dependencies
const Variable = require("../Variable.class");
const Scalar = require("./Scalar.class");

/**
 * @class Scalar
 * @extends Variable
 */
class String extends Variable {

    /**
     * @constructor
     * @param {!String} name Scalar variable name
     * @param {String} value Scalar value
     *
     * @throws {TypeError}
     */
    constructor(name, value) {
        super(name, "string");
        if (value instanceof String || value instanceof Scalar || typeof value === "string") {
            this.value = value;
        }
        else {
            throw new TypeError("value should be instanceof String or Scalar (or even typeof string)");
        }
    }

}

module.exports = String;
