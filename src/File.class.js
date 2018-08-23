// Require Node.JS Dependencies
const { join } = require("path");
const { writeFile } = require("fs").promises;

// Require Internal Dependencies
const Scope = require("./Scope.class");

/**
 * @class File
 */
class File {

    /**
     * @constructor
     * @param {!String} name name
     * @param {Object=} [options={}] File options
     * @param {Boolean=} [options.isPerlModule=false] Establish if the file is a perl module or not
     *
     * @throws {TypeError}
     */
    constructor(name, options = {}) {
        if (typeof name !== "string") {
            throw new TypeError("name should be typeof string");
        }

        this.name = name;
        this.isPerlModule = options.isPerlModule || false;
        // TODO: Make it hidden!
        this.rootScope = new Scope();
    }

    /**
     * @public
     * @memberof File#
     * @member {Scope} payload
     * @desc Get the root scope!
     */
    get root() {
        return this.rootScope;
    }

    /**
     * @public
     * @async
     * @method writeFileToDisk
     * @param {!String} location Location how to write the file!
     * @returns {Promise<void>}
     */
    async writeFileToDisk(location) {
        if (typeof location !== "string") {
            throw new TypeError("location should be typeof string");
        }

        const filePath = join(location, `${this.name}.${this.isPerlModule ? "pm" : "pl"}`);
        const retStr = this.root.toString();
        console.log(retStr);
        await writeFile(filePath, retStr);
    }

}

module.exports = File;
