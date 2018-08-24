// Require Node.JS Dependencies
const { join } = require("path");
const { writeFile } = require("fs").promises;

// Require Internal Dependencies
const Scope = require("./Scope.class");
const Dependency = require("./Dependency.class");

/**
 * @class File
 */
class File {

    /**
     * @constructor
     * @param {!String} name name
     * @param {Object=} [options={}] File options
     * @param {Boolean=} [options.module=false] Establish if the file is a perl module or not
     * @param {Boolean=} [options.strict=true] Enable strict mode
     *
     * @throws {TypeError}
     */
    constructor(name, options = File.DefaultConstructorOptions) {
        if (typeof name !== "string") {
            throw new TypeError("name should be typeof string");
        }
        // TODO: Ensure assignment of default options!

        /** @type {Boolean} */
        const isModule = options.module || false;

        this.name = name;
        this.fileExt = isModule ? "pm" : "pl";
        this.dependencies = [];

        // TODO: Make it hidden!
        this.rootScope = new Scope();
        if (options.strict === true) {
            this.use(new Dependency("strict"));
        }
    }

    /**
     * @public
     * @method use
     * @param {!Dependency} dependency dependency to use
     * @return {void}
     */
    use(dependency) {
        if (dependency instanceof Dependency === false) {
            throw new TypeError("dependency should be instanceof Dependency!");
        }

        this.dependencies.push(dependency);
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

        const filePath = join(location, `${this.name}.${this.fileExt}`);
        const depStr = this.dependencies.map((dep) => dep.toString()).join("");
        const retStr = `${depStr}\n${this.root.toString()}`;
        console.log(retStr);
        await writeFile(filePath, retStr);
    }

}

File.DefaultConstructorOptions = {
    strict: true,
    module: false
};

module.exports = File;
