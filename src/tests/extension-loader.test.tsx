import * as fs from "fs";
import * as path from "path";
import { ExtensionLoader } from "../extension-loader";

describe("ExtensionLoader", (): void => {
    const testFolder = "./TestExtensionLoader";
    const ext0File = "ayyy.js"
    const ext0Content = `// START METADATA
// NAME: Ayyy
// AUTHOR: Lmao
// DESCRIPTION: Yomama.
// END METADATA`

    const ext1File = "lmao.js"
    const ext1Content = `// START METADATA`

    const ext2File = "yomama.js"
    const ext2Content = `(function(){})()`

    if (!fs.existsSync(testFolder)) {
        fs.mkdirSync(testFolder);
    }
    fs.writeFileSync(path.join(testFolder, ext0File), ext0Content)
    fs.writeFileSync(path.join(testFolder, ext1File), ext1Content)
    fs.writeFileSync(path.join(testFolder, ext2File), ext2Content)
    fs.writeFileSync(path.join(testFolder, "unknown.file"), "")

    const loader = new ExtensionLoader(testFolder);
    it("Load files from extension folder. Should return 3", (): void => {
        expect(loader.collection.length).toBe(3);
    })

    it("Read Metadata. Should return all fields info correctly", (): void => {
        const meta = loader.collection[0];
        expect(meta.name).toBe("Ayyy");
        expect(meta.author).toBe("Lmao");
        expect(meta.description).toBe("Yomama.");
    })

    it("Read invalid metadata. Should return default info", (): void => {
        const meta = loader.collection[1];
        expect(meta.name).toBe(ext1File);
        expect(meta.author).toBe("N/A");
        expect(meta.description).toBe("N/A");
    })

    it("Read no metadata extension. Should return default info", (): void => {
        const meta = loader.collection[2];
        expect(meta.name).toBe(ext2File);
        expect(meta.author).toBe("N/A");
        expect(meta.description).toBe("N/A");
    })

    afterAll((): void => {
        fs.rmdirSync(testFolder);
    })
})