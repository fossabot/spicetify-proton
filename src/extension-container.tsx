import * as childProcess from "child_process";
import * as React from "react";
import fs from "fs";
import { IMetadata } from "./metadata";
import {
    Box,
    Button,
    Checkbox,
    Grid,
    Group,
    render,
    Text,
    } from "proton-native";

export class ExtensionContainer extends React.Component<{metadata: IMetadata}, IMetadata> {
    private activated: boolean;
    private watching: boolean;

    constructor(props: {metadata: IMetadata}) {
        super(props);
        this.state = props.metadata;
        this.activated = this.state.activator.getState(this.state.id);
        this.watching = false;
    }

    public render() {
        return (
            <Group key={this.state.id} stretchy={false} title={this.state.name}>
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
                        <Button onClick={() => this.openFile(this.state.path)}>Open file</Button>
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
            this.state.activator.activate(this.state.id);
        } else {
            this.state.activator.deactivate(this.state.id);
        }
        this.activated = this.state.activator.getState(this.state.id);
    }
}
