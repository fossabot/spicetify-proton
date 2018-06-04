import * as fs from "fs";
import * as path from "path";
import { defaultSetting } from "./default-setting";
import { Settings } from "./settings";

export class SettingLoader {
    private settingFilePath: string;
    private setting: Settings;

    public constructor(filePath?: string) {
        if (filePath !== undefined) {
            this.settingFilePath = filePath;
        } else {
            this.settingFilePath = path.join(process.cwd(), "setting.json");
        }
        this.setting = this.load();
    }

    public load(): Settings {
        try {
            const fileContent = fs.readFileSync(this.settingFilePath, "utf-8");
            const parsed = JSON.parse(fileContent) as Settings;
            const merged = Object.assign(defaultSetting, parsed);
            return merged;
        } catch (err) {
            this.write(defaultSetting);
            return defaultSetting;
        }
    }

    public write(setting: Settings): void {
        const stringified = JSON.stringify(setting, undefined, 4);
        fs.writeFileSync(this.settingFilePath, stringified, "utf-8");
    }

    public set<K extends keyof Settings>(key: K, value: Settings[K]): void {
        this.setting[key] = value;
        this.write(this.setting);
    }
}
