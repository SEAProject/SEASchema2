// Require Node.JS Dependencies
const { join } = require("path");

// Require Internal Dependencies
const { File, Scope } = require("./src");
const { Scalar, String } = require("./src/primitives");

async function main() {
    const mpf = new File("test");

    const ScaTest = new Scalar("test", "hello world!");
    mpf.root.add(ScaTest);
    const refT = new Scalar("refT", ScaTest.referenceOf());
    mpf.root.add(refT);
    const StrBar = new String("bar", refT);
    mpf.root.add(StrBar);

    const subS = new Scope();
    subS.add(new String("foo", "wahou!"));
    mpf.root.add(subS);
    console.log(`Scope has bar: ${subS.hasVariable("bar")}`);

    await mpf.writeFileToDisk(join(__dirname, "./test"));
}
main().catch(console.error);
