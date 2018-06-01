import * as React from "react";
import { render, Box, ColorButton, Group, Separator, Text } from "proton-native";

interface ColorDict {
    [key: string]: string
}

const colorDictionary = {
    cover_overlay_and_shadow: "Cover overlay\nShadow",
    indicator_fg_and_button_bg: "Indicator FG\nButton BG",
    main_bg: "Main BG",
    main_fg: "Main FG",
    miscellaneous_bg: "Misc. BG",
    miscellaneous_hover_bg: "Misc. hover BG",
    preserve_1: "Preserve",
    pressing_button_bg: "Pressing button BG",
    pressing_button_fg: "Pressing button FG",
    pressing_fg: "Pressing FG",
    scrollbar_fg_and_selected_row_bg: "Scrollbar FG\nSelected row BG",
    secondary_fg: "Secondary FG",
    selected_button: "Selected button",
    sidebar_and_player_bg: "Sidebar BG\nplayer BG",
    sidebar_indicator_and_hover_button_bg: "Sidebar indicator\nHover button BG",
    slider_bg: "Slider BG",
} as ColorDict

export class ColorContainer extends React.Component {
    private text: string;
    private color: string;
    private row: number;
    private column: number;

    constructor(content: {var: string, color: string, row: number, column: number}) {
        super(content);
        this.color = content.color;
        this.row = content.row;
        this.column = content.column;
        if (colorDictionary[content.var] !== undefined) {
            this.text = colorDictionary[content.var];
        } else {
            this.text = "Unknown";
        }
    }

    public render() {
        return (
            <Box
                stretchy={false}
                key={this.text}
                align={{h: false, v: false}}
                row={this.row}
                column={this.column}
            >
                <ColorButton
                    stretchy={false}
                    color={this.color}
                />
                <Text>{this.text}</Text>
            </Box>
        );
    }
}
