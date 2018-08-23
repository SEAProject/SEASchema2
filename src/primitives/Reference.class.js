/**
 * @class Reference
 */
class Reference {

    /**
     * @constructor
     * @param {!Variable} variable variable
     */
    constructor(variable) {
        if (!Reference.availablePrototype.has(variable.constructor.name)) {
            throw new TypeError("invalid variable prototype name!");
        }
        this.variable = variable;
    }

    /**
     * @public
     * @method referenceOf
     * @returns {String}
     */
    valueOf() {
        return `\\${this.variable.valueOf()}`;
    }

}
Reference.availablePrototype = new Set(["Scalar", "String"]);

module.exports = Reference;
