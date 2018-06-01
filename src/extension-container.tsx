import * as React from "react";
import { render, Box, Button, Checkbox, Grid, Group, Text } from "proton-native";
import * as childProcess from "child_process";
import fs from "fs";
import { ExtensionMetadata } from "./extension-loader";

export class ExtensionContainer extends React.Component<{}, ExtensionMetadata> {
    private activated: boolean;
    private watching: boolean;

    constructor(metadata: ExtensionMetadata) {
        super(metadata);
        this.state = metadata;
        this.activated = this.state.activator.getState(this.state.fileName);
        this.watching = false;
    }

    public render() {
        return (
            <Group key={this.state.fileName} stretchy={false} title={this.state.name}>
                <Box>
                    <Text>{this.state.author}</Text>
                    <Text>{this.state.description}</Text>
                    <Box vertical={false}>
                        <Checkbox
                            checked = {this.activated}
                            onToggle = {(checked: boolean) => this.onEnable(checked)}>
                            Enable
                        </Checkbox>
                        <Checkbox>Watch</Checkbox>
                        <Button onClick={() => this.openFile(this.state.filePath)}>Open file</Button>
                        <Button>Push</Button>
                    </Box>
                </Box>
            </Group>
        );
    }

    private openFile(file: string) {
        childProcess.exec(file, (err) => {
            if (err) {
                // console.log(err);
            }
        });
    }

    private onWatch(checked: boolean) {
        // nothing, yet
    }

    private onPush() {
        const doSomethinglater = {};
    }

    private onEnable(enabled: boolean) {
        if (enabled) {
            this.state.activator.activate(this.state.fileName);
        } else {
            this.state.activator.deactivate(this.state.fileName);
        }
        this.activated = this.state.activator.getState(this.state.fileName);
    }
}
