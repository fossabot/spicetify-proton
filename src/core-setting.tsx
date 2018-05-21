import React, { Component } from "react";
import { render, Box, Checkbox, Group } from "proton-native";

export class CoreSetting extends Component {
    public render() {
        return (
            <Box padded={true}>
                <Checkbox>Replace colors</Checkbox>
                <Checkbox>Inject CSS</Checkbox>
                <Checkbox>Employee mode</Checkbox>
                <Checkbox>Enable Home</Checkbox>
                <Checkbox>Enable Radio</Checkbox>
                <Checkbox>Enable Lyric</Checkbox>
                <Checkbox>Lyrics button always show</Checkbox>
                <Checkbox>Force no sync lyrics</Checkbox>
                <Checkbox>High visualization framerate</Checkbox>
                <Checkbox>Custom visualizations</Checkbox>
                <Checkbox>Disable Sentry</Checkbox>
                <Checkbox>Disable UI logger</Checkbox>
            </Box>
        );
    }
}
