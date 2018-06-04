import * as React from "react";
import { IColorChanger } from "./color-select";
import { to } from "color-string";
import {
    Box,
    ColorButton,
    Group,
    render,
    Separator,
    Text,
    } from "proton-native";

export const colorDictionary: { [key: string]: string } = {
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
};

interface IColorButton {
    changer: IColorChanger["changer"];
    color: string;
    column: number;
    id: string;
    row: number;
}

export class ColorContainer extends React.Component<IColorButton> {
    private changer: IColorChanger["changer"];
    private color: string;
    private column: number;
    private id: string;
    private row: number;
    private text: string;

    constructor(props: IColorButton) {
        super(props);
        this.color = props.color;
        this.row = props.row;
        this.column = props.column;
        this.changer = props.changer;
        this.id = props.id;

        if (colorDictionary[this.id] !== undefined) {
            this.text = colorDictionary[this.id];
        } else {
            this.text = props.id;
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
                    onChange={(c) => this.changeColor([c.r, c.g, c.b])}
                />
                <Text>{this.text}</Text>
            </Box>
        );
    }

    private changeColor(color: [number, number, number]): void {
        const hex = to.hex(color);
        this.changer(this.id, hex);
    }
}
