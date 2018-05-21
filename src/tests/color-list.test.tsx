import { ColorList } from "../color-list";
import { RawTheme } from "../theme-loader";

describe("color-list", (): void => {
    const testColor = {
        "main_fg": "#FFFFFF",
        "secondary_fg": "#BORKCOLOR",
        "main_bg": "#FFFFFF",
        "sidebar_and_player_bg": "#FFFFFF",
        "cover_overlay_and_shadow": "#FFFFFF",
        "indicator_fg_and_button_bg": "#FFFFFF",
        "pressing_fg": "#FFFFFF",
        "slider_bg": "#FFFFFF",
        "sidebar_indicator_and_hover_button_bg": "#FFFFFF",
        "scrollbar_fg_and_selected_row_bg": "#FFFFFF",
        "pressing_button_fg": "#FFFFFF",
        "pressing_button_bg": "#FFFFFF",
        "selected_button": "#FFFFFF",
        "miscellaneous_bg": "#FFFFFF",
        "miscellaneous_hover_bg": "#FFFFFF",
        "preserve_1": "#FFFFFF",
    } as RawTheme;

    const colorList = new ColorList(testColor);
    it("Should return 255,255,255", (): void => {
        expect(colorList.list["main_fg"].rgb).toBe("rgb(255, 255, 255)");
    });

    it("Should return default 0, 0, 0", (): void => {
        expect(colorList.list["secondary_fg"].rgb).toBe("rgb(0, 0, 0)");
    });
})