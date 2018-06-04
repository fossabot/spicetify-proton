import * as path from "path";
import { Backup } from "../backup";

describe("Backup", () => {
    const mockupFolder = path.join(process.cwd(), "FakeSpotify");
    const backup = new Backup(mockupFolder);
    it("Should open a error dialog", () => {
        backup.cleanBackup()
    })
})