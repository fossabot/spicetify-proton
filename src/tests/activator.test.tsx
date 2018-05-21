import { Activator } from "../activator";
import * as fs from "fs";

describe("Activator", (): void => {
    const testActivatorFile = "./testactivator.json";
    const list = ["asd.js", "lmao.js", "yomama.js", "ayyy.js"];
    const availableList = ["asd.js", "yomama.js", "ayyy.js"];

    const blankActivator = new Activator(testActivatorFile);
    it("List should be blank", (): void => {
        expect(blankActivator.list.length).toBe(0);
    })

    fs.writeFileSync(testActivatorFile, JSON.stringify(list), "utf-8");
    const activator = new Activator(testActivatorFile, availableList);

    it("lmao.js item should be removed", (): void => {
        expect(activator.getState("lmao.js")).toBe(false);
    });

    it("Activate \"heck.js\". Should return true", (): void => {
        activator.activate("heck.js");
        expect(activator.getState("heck.js")).toBe(true);
    });

    it("Activate \"heck.js\" again. Should do nothing and return true", (): void => {
        activator.activate("heck.js");
        expect(activator.getState("heck.js")).toBe(true);
    });

    it("Deactivate yomama.js. Should return false", () => {
        activator.deactivate("yomama.js");
        expect(activator.getState("yomama.js")).toBe(false);
    });

    it("Deactivate yomama.js again. Should do nothing and return false", () => {
        activator.deactivate("yomama.js");
        expect(activator.getState("yomama.js")).toBe(false);
    });

    afterAll(() => {
        fs.unlinkSync(testActivatorFile);
    });
})
