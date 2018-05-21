import * as ColorString from "color-string";
import { RawTheme } from "./theme-loader";
import { get, to } from "color-string";

export interface DetailColor {
    hex: string;
    rgb: string;
}

const varList =  [
    "main_fg",
    "secondary_fg",
    "main_bg",
    "sidebar_and_player_bg",
    "cover_overlay_and_shadow",
    "indicator_fg_and_button_bg",
    "pressing_fg",
    "slider_bg",
    "sidebar_indicator_and_hover_button_bg",
    "scrollbar_fg_and_selected_row_bg",
    "pressing_button_fg",
    "pressing_button_bg",
    "selected_button",
    "miscellaneous_bg",
    "miscellaneous_hover_bg",
    "preserve_1",
];

export class ColorList {
    public list = {};

    public constructor(colors: RawTheme) {
        varList.forEach((varName) => {
            this.list[varName] = {
                hex: "",
                rgb: "",
            } as DetailColor;
        });

        Object.keys(colors).forEach((key: string) => {
            this.assignColor(key, colors[key]);
        });
    }

    public assignColor(name: string, value: string) {
        const converted = get(value);
        if (converted) {
            const colorOnly = converted.value.slice(0, 3);
            this.list[name].hex = to.hex(colorOnly);
            this.list[name].rgb = to.rgb(colorOnly);
        } else {
            this.list[name].hex = "#000000";
            this.list[name].rgb = "rgb(0, 0, 0)";
        }
    }
}
