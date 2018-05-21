import { Settings } from "./settings";
import { defaultSetting } from "./default-setting";
import * as fs from "fs";

export class SettingLoader {
    private settingFilePath: string;

    public constructor(path: string) {
        this.settingFilePath = path;
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

    public set(key: string, value: any): void {
        const setting = this.load();
        if (typeof value === typeof setting[key]) {
            setting[key] = value;
            this.write(setting);
        }
    }
}
