// Require Node.JS Dependencies
const { join } = require("path");

// Require Internal Dependencies
const { File, Scope, Dependency, Routine, Return } = require("./src");
const { Scalar, String } = require("./src/primitives");

async function main() {
    const perlFile = new File("test", {
        strict: true,
        module: false
    });
    perlFile.use(new Dependency("stdlib.string", ["isString"]));

    const handler = new Routine("handler");
    const fun = new String("fun", "lol");
    handler.add(fun);
    handler.add(new Return(fun));
    perlFile.root.add(handler);
    const foo = new String("foo", handler);
    perlFile.root.add(foo);

    console.time("writeToDisk");
    await perlFile.writeFileToDisk(join(__dirname, "./out"));
    console.timeEnd("writeToDisk");
}
main().catch(console.error);
