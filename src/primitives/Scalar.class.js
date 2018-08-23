// Require Internal Dependencies
const Variable = require("../Variable.class");

/**
 * @class Scalar
 * @extends Variable
 */
class Scalar extends Variable {

    /**
     * @constructor
     * @param {!String} name Scalar variable name
     * @param {*} value Scalar value
     */
    constructor(name, value) {
        super(name);
        if (!Scalar.availableTypeOf.has(value.constructor.name)) {
            throw new TypeError("Invalid value type for Scalar!");
        }
        this.value = value;
    }

}
Scalar.availableTypeOf = new Set(["String", "Number", "Boolean", "Reference"]);

module.exports = Scalar;
