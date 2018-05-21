import React, { Component } from "react";
import { render, Window, App, Box, Button, Group, ProgressBar, Tab } from "proton-native";
import { Extension } from "./extension";
import { CoreSetting } from "./core-setting";
import { ColorSelect } from "./color-select";
import { CustomApp } from "./custom-app";
import { FolderPick } from "./folder-pick";
import { ButtonAction } from "./button-action";

class Spicetify extends Component {
    public render() {
        return (
            <App>
                <Window title="SpicetifyProton" margined={true} menuBar={false}>
                <Box padded>
                    <Box stretchy={false}><FolderPick /></Box>
                    <Tab>
                        <Box padded label="Core setting"><CoreSetting/></Box>
                        <Box padded label="Color"><ColorSelect/></Box>
                        <Box padded label="Extension"><Extension/></Box>
                        <Box padded label="App"><CustomApp/></Box>
                    </Tab>
                    <ButtonAction />
                    <Group stretchy={false}><ProgressBar value={-1}/></Group>
                </Box>
            </Window>
          </App>
        );
    }
}

render(<Spicetify />);
