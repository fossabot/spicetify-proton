import * as fs from "fs";
import { Color, get, to } from "color-string";
import { defaultTheme } from "./default-theme";

export interface RawTheme {
    [key: string]: string;
}

export class ThemeLoader {
    public theme: RawTheme;
    private path: string;

    public constructor(path?: string) {
        if (path !== undefined) {
            this.path = path;
            this.theme = this.loadColor();
        } else {
            // TODO: Create new theme file in theme folder and put its path here
            this.path = "";
            this.theme = this.loadDefault();
        }
    }

    public loadCSS(): string {
        return "Do nothing, yet";
    }

    public setColor(key: string, value: string) {
        this.theme[key] = this.parseColor(value);
        fs.writeFileSync(this.path, JSON.stringify(this.theme, undefined, 4), "utf-8");
    }

    private loadColor(): RawTheme {
        try {
            const file = fs.readFileSync(this.path, "utf-8");
            const content = JSON.parse(file) as RawTheme;

            Object.keys(content).forEach((key: string) => {
                content[key] = this.parseColor(content[key]);
            });

            return content;
        } catch (e) {
            return this.loadDefault();
        }
    }

    private loadDefault(): RawTheme {
        return defaultTheme;
    }

    private parseColor(rawColor: string, fallback = "#000000"): string {
        const converted = get(rawColor);
        if (converted !== null) {
            // Remove alpha value
            return to.hex(converted.value.slice(0, 2));
        } else {
            return fallback;
        }
    }
}
