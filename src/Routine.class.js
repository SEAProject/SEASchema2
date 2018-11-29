// Require Internal Dependencies
const Scope = require("./Scope.class");
const Reference = require("./primitives/Reference.class");

function RoutineShifting(args, shifting = false) {

}

/**
 * @class Routine
 */
class Routine extends Scope {

    /**
     * @constructor
     * @param {!String} name routine name
     * @param {Array=} args routine arguments
     */
    constructor(name, args = []) {
        super();
        this.name = name;
        this.args = args;
        this.hasReturnStmt = false;
        this.returnType;

        this.on("newElement", ({ index, type }) => {
            if (type === "Return") {
                this.hasReturnStmt = true;
                this.returnType = this.elements[index].returnedElement.constructor.name;
            }
        });
    }

    /**
     * @public
     * @method ref
     * @returns {Reference}
     */
    ref() {
        return new Reference(this);
    }

    /**
     * @public
     * @method valueOf
     * @returns {String}
     */
    valueOf() {
        
    }

    /**
     * @public
     * @method toString
     * @param {Number=} indentation default indentation
     * @return {String}
     */
    toString(indentation = 0) {
        return `sub ${this.name} ${super.toString(indentation)}`;
    }

}

module.exports = Routine;
