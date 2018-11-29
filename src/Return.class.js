// Require third-party module
const is = require("@sindresorhus/is");

/**
 * @class Return
 */
class Return {

    /**
     * @constructor
     * @param {*} element element
     */
    constructor(element) {
        this.returnedElement = element;
    }

    /**
     * @public
     * @method toString
     * @return {String}
     */
    toString() {
        return is.nullOrUndefined(this.returnedElement) ?
            "return undef;\n" :
            `return ${this.returnedElement.valueOf()};\n`;
    }

}

module.exports = Return;
