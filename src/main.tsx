import React, { Component } from "react";
import { render, Window, App, Box, Button, Form, Group, ProgressBar, TextInput } from "proton-native";
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
          <Box padded={true}>
            <FolderPick />
            <Box vertical={false}>
              <CoreSetting/>
              <ColorSelect/>
              <Extension/>
              <CustomApp/>
            </Box>
            <ButtonAction />
            <Group><ProgressBar value={-1}/></Group>
          </Box>
        </Window>
      </App>
    );
  }
}

render(<Spicetify />);
