import * as ColorString from "color-string";
import { get, to } from "color-string";
import { RawTheme } from "./theme-loader";

export interface IDetailColor {
    id: string;
    hex: string;
    rgb: string;
}

// If adding new var in this list, colorDictionary should be added as well.
const orderedVarList =  [
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
    public list = [] as IDetailColor[];

    public constructor(colors: RawTheme) {
        const clone: RawTheme = {};
        Object.assign(clone, colors);

        orderedVarList.forEach((id) => {
            const { hex, rgb } = this.validateColor(clone[id]);
            this.list.push({ id, hex, rgb });
            delete clone[id];
        });

        // Append remaining colors
        Object.keys(clone).forEach((id) => {
            const { hex, rgb } = this.validateColor(clone[id]);
            this.list.push({ id, hex, rgb });
        });
    }

    private validateColor(rawColor: string): { hex: string, rgb: string } {
        const converted = get(rawColor);
        if (converted) {
            const colorOnly = converted.value.slice(0, 3);
            return { hex: to.hex(colorOnly), rgb: to.rgb(colorOnly) };
        } else {
            return { hex: "#000000", rgb: "rgb(0, 0, 0)" };
        }
    }
}
