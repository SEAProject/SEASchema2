/**
 * @class Reference
 */
class Reference {

    /**
     * @constructor
     * @param {!Variable} ref ref (variable, routine etc...)
     */
    constructor(ref) {
        if (!Reference.availablePrototype.has(ref.constructor.name)) {
            throw new TypeError("invalid variable prototype name!");
        }
        this.ref = ref;
    }

    /**
     * @public
     * @method referenceOf
     * @returns {String}
     */
    valueOf() {
        return `\\${this.ref.valueOf()}`;
    }

}
Reference.availablePrototype = new Set(["Scalar", "String", "Routine"]);

module.exports = Reference;
