// Require Internal Dependencies
const Reference = require("./primitives/Reference.class");

// Require Third-party Dependencies
const is = require("@sindresorhus/is");

/**
 * @class Variable
 */
class Variable {

    /**
     * @constructor
     * @param {!String} name variable name
     * @param {String=} stdtype variable stdtype
     *
     * @throws {TypeError}
     */
    constructor(name, stdtype) {
        if (typeof name !== "string") {
            throw new TypeError("name should be typeof string");
        }

        this.name = name;
        if (!Variable.availableStdType.has(typeof stdtype)) {
            throw new TypeError("Invalid stdtype!");
        }
        this.isReference = false;
        this.stdtype = stdtype;
        // TODO: Set it hidden
        this._value = null;
    }

    /**
     * @public
     * @memberof Variable#
     * @param {*} newValue new value
     * @desc Get the root scope!
     */
    set value(newValue) {
        let fValue;
        if (newValue instanceof Variable) {
            // TODO: Retrieve the constructor name to render right reference
            fValue = newValue.isReference ? `$${newValue.valueOf()}` : newValue.valueOf();
        }
        else if (newValue instanceof Reference) {
            fValue = newValue.valueOf();
            this.isReference = true;
        }
        else if (typeof newValue === "string") {
            fValue = `"${newValue}"`;
        }
        else if (typeof newValue === "boolean") {
            fValue = Number(newValue);
        }
        else {
            fValue = newValue;
        }

        this._value = is.nullOrUndefined(this.stdtype) ? fValue : `stdlib::${this.stdtype}->new(${fValue})`;
    }

    /**
     * @public
     * @method referenceOf
     * @returns {Reference}
     */
    referenceOf() {
        return new Reference(this);
    }

    /**
     * @public
     * @method valueOf
     * @returns {String}
     */
    valueOf() {
        return is.nullOrUndefined(this.stdtype) ? `$${this.name}` : `$${this.name}->valueOf()`;
    }

    /**
     * @public
     * @method toString
     * @returns {String}
     */
    toString() {
        return is.nullOrUndefined(this._value) ?
            `my $${this.name};\n` :
            `my $${this.name} = ${this._value.toString()};\n`;
    }

}
Variable.availableStdType = new Set(["string", "integer", "undefined"]);

module.exports = Variable;
