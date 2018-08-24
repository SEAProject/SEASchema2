// Require third-party Dependencies
const is = require("@sindresorhus/is");

// TODO: Support lib path!

/**
 * @class Dependency
 */
class Dependency {

    /**
     * @constructor
     * @param {String} pkgName package name
     * @param {Array=} requiredVars required internal vars
     *
     * @throws {TypeError}
     */
    constructor(pkgName, requiredVars = []) {
        if (typeof pkgName !== "string") {
            throw new TypeError("Invalid package type");
        }
        if (!is.array(requiredVars)) {
            throw new TypeError("requiredVars should be instanceof Array");
        }
        this.name = pkgName.split(".").join("::");
        this.requiredVars = requiredVars;
    }

    /**
     * @public
     * @method toString
     * @return {String}
     */
    toString() {
        return this.requiredVars.length === 0 ?
            `use ${this.name};\n` :
            `use ${this.name} qw(${this.requiredVars.join(" ")});\n`;
    }

}

module.exports = Dependency;
