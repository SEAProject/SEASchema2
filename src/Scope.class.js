// Require Internal Dependencies
const Variable = require("./Variable.class");

// Require Third-party Dependencies
const is = require("@sindresorhus/is");

/**
 * @class Scope
 */
class Scope {

    /**
     * @constructor
     */
    constructor() {
        /** @type {Scope} */
        this.root = null;
        this.variables = new Map();
        this.elements = [];
    }

    /**
     * @public
     * @method hasVariable
     * @param {!String} name variable name
     * @param {Boolean=} forceLocal force local search
     * @return {Boolean}
     *
     * @throws {TypeError}
     */
    hasVariable(name, forceLocal = false) {
        if (typeof name !== "string") {
            throw new TypeError("name should be typeof string");
        }

        const hasLocal = this.variables.has(name);
        if (forceLocal || is.nullOrUndefined(this.root)) {
            return hasLocal;
        }

        return this.root.hasVariable(name);
    }

    /**
     * @public
     * @method add
     * @param {*} element element
     * @returns {void}
     */
    add(element) {
        const len = this.elements.push(element);
        if (element instanceof Variable) {
            this.variables.set(element.name, len - 1);
        }
        else if (element instanceof Scope) {
            element.root = this;
        }
    }

    /**
     * @public
     * @method toString
     * @param {Number=} indentation indentation size
     * @returns {String}
     */
    toString(indentation = 0) {
        const setupBracket = !is.nullOrUndefined(this.root);
        const spaces = indentation === 0 ? "" : " ".repeat(indentation);
        const strArr = [];

        for (const elem of this.elements) {
            if (elem instanceof Scope) {
                strArr.push(elem.toString(indentation + Scope.indentation));
                continue;
            }
            strArr.push(spaces + elem.toString());
        }

        return setupBracket ? `{\n${strArr.join("")}};\n` : strArr.join("");
    }

}
Scope.indentation = 4;

module.exports = Scope;
