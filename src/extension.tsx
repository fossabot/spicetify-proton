import React, { Component } from "react";
import { render, Box, Button, Checkbox, Grid, Group, Text } from "proton-native";
import fs from "fs";
import path from "path";
import * as childProcess from "child_process";
import { ExtensionMetadata, ExtensionContainer } from "./extension-container";

export class Extension extends Component {
    private readonly extensionFolderPath = "./User/Extensions";

    public render() {
        return (
            <Group title="Extensions:">
                <Box>
                    {this.getExtensionCollection().map((ext: ExtensionContainer) => ext.render())}
                </Box>
            </Group>
        );
    }

    private getExtensionCollection(): ExtensionContainer[] {
        const collection = [] as ExtensionContainer[];
        fs.readdirSync(this.extensionFolderPath).forEach((file: string): void => {
            const filePath = path.join(this.extensionFolderPath, file);
            const content = fs.readFileSync(filePath, "utf-8");
            const metadata = {
                author: "N\\A",
                description: "N\\A",
                filePath,
                name: file,
            } as ExtensionMetadata;

            if (content.match(/\/\/ START METADATA/)) {
                const name = content.match(/\/\/ NAME: (.*)/);
                const author = content.match(/\/\/ AUTHOR: (.*)/);
                const description = content.match(/\/\/ DESCRIPTION: (.*)/);
                if (name) {
                    metadata.name = name[1];
                }

                if (author) {
                    metadata.author = author[1];
                }

                if (description) {
                    metadata.description = description[1];
                }
            }
            collection.push(new ExtensionContainer(metadata));
        });
        return collection;
    }
}
