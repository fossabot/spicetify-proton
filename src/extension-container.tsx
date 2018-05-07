import React, { Component } from "react";
import { render, Box, Button, Checkbox, Grid, Group, Text } from "proton-native";
import * as childProcess from "child_process";
import fs from "fs";

export interface ExtensionMetadata {
    filePath: string;
    name: string;
    author: string;
    description: string;
}

export class ExtensionContainer extends Component {
    private metadata: ExtensionMetadata;
    private watcher: fs.FSWatcher;

    constructor(state: ExtensionMetadata) {
        super(state);
        this.metadata = state;
    }

    public render() {
        return (
            <Group title={this.metadata.name}>
                <Box>
                    <Text>{this.metadata.author}</Text>
                    <Text>{this.metadata.description}</Text>
                    <Box vertical={false}>
                        <Checkbox>Enable</Checkbox>
                        <Checkbox>Watch</Checkbox>
                        <Button onClick={() => this.openFile(this.metadata.filePath)}>Open file</Button>
                        <Button>Push</Button>
                    </Box>
                </Box>
            </Group>
        );
    }

    private openFile(file: string) {
        childProcess.exec(file, (err, stoud, sterr) => {
            if (err) {
                // console.log(err);
            }
        });
    }

    private onWatch(checked: boolean) {
        if (checked) {
            this.watcher = fs.watch(this.metadata.filePath, this.onPush);
        } else {
            if (this.watcher) {
                this.watcher.close();
            }
        }
    }

    private onPush() {
        const doSomethinglater = {};
    }
}
