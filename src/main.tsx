import * as React from "react";
import { ButtonAction } from "./button-action";
import { ColorList } from "./color-list";
import { ColorSelect } from "./color-select";
import { CoreSetting } from "./core-setting";
import { CustomApp } from "./custom-app";
import { Extension } from "./extension";
import { ExtensionLoader } from "./extension-loader";
import { FolderPick } from "./folder-pick";
import { SettingLoader } from "./setting-loader";
import { ThemeLoader } from "./theme-loader";
import {
    App,
    Box,
    Group,
    ProgressBar,
    render,
    Tab,
    Window,
    } from "proton-native";

class Spicetify extends React.Component {
    private extensionLoader: ExtensionLoader;
    private themeLoader: ThemeLoader;
    private settingLoader: SettingLoader;

    constructor(props: {}) {
        super(props);
        this.themeLoader = new ThemeLoader(/* load default */);
        this.settingLoader = new SettingLoader(/* load default */);
        this.extensionLoader = new ExtensionLoader(/* load default */);
    }

    public render() {
        return (
            <App>
                <Window title="SpicetifyProton" margined={true} menuBar={false}>
                <Box padded>
                    <Box stretchy={false}><FolderPick /></Box>
                    <Tab>
                        <Box padded label="Core setting"><CoreSetting/></Box>
                        <Box padded label="Color">
                            <ColorSelect
                                // TODO: move to constructor
                                list = {new ColorList(this.themeLoader.theme).list}
                                changer = {this.themeLoader.setColor}
                            />
                        </Box>
                        <Box padded label="Extension">
                            <Extension
                                collection={this.extensionLoader.collection}
                            />
                        </Box>
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
