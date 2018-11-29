// Require Node Dependencies
const events = require("events");

// Require Internal Dependencies
const Variable = require("./Variable.class");

// Require Third-party Dependencies
const is = require("@sindresorhus/is");

/**
 * @class Scope
 * @extends events
 */
class Scope extends events {

    /**
     * @constructor
     */
    constructor() {
        super();

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
        const index = this.elements.push(element) - 1;
        const type = element.constructor.name;
        if (element instanceof Variable) {
            this.variables.set(element.name, index);
        }
        else if (element instanceof Scope) {
            element.root = this;
        }

        // Emit new element!
        this.emit("newElement", {
            index, type
        });
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
        const subSpaces = indentation === Scope.indentation ? "" : " ".repeat(indentation / 2);
        const strArr = [];

        for (const elem of this.elements) {
            if (Scope.indentedElements.has(elem.constructor.name)) {
                strArr.push(spaces + elem.toString(indentation + Scope.indentation));
                continue;
            }
            strArr.push(spaces + elem.toString());
        }

        return setupBracket ? `{\n${strArr.join("")}${subSpaces}};\n` : strArr.join("");
    }

}

Scope.indentedElements = new Set(["Scope", "Routine"]);
Scope.indentation = 4;

module.exports = Scope;
