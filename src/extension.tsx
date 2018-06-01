import * as React from "react";
import * as fs from "fs";
import * as path from "path";
import * as childProcess from "child_process";
import { render, Box, Button, Checkbox, Grid, Group, Text } from "proton-native";
import { ExtensionLoader, ExtensionMetadata } from "./extension-loader";
import { ExtensionContainer } from "./extension-container";
import { Page } from "./page";
import { Activator } from "./activator";
import { Watcher } from "./watcher";

interface ExtensionProp { }
export class Extension extends React.Component<ExtensionProp, { content: React.ReactNode[]; }> {
    private readonly extensionFolderPath = "./User/Extensions";
    private paging: Page;
    private collection: ExtensionContainer[];

    public constructor(props: ExtensionProp) {
        super(props);
        this.collection = this.getExtensionCollection();
        this.paging = new Page(this.collection, 3);
        this.state = {
            content: this.paging.render(),
        };
    }

    public render() {
        return (
            <Box>
                <Box>{this.state.content}</Box>
                <Box padded stretchy={false} vertical={false}>
                    <Box></Box>
                    <Button
                        onClick={() => this.setState({
                            content: this.paging.changePage(-1),
                        })}
                        stretchy={false}>{"  ◄  "}
                    </Button>
                    <Box stretchy={false}>
                        <Box></Box>
                        <Text stretchy={false}>{`${this.paging.currentPage + 1} / ${this.paging.totalPage}`}</Text>
                        <Box></Box>
                    </Box>
                    <Button
                        onClick={() => this.setState({
                            content: this.paging.changePage(1),
                        })}
                        stretchy={false}>{"  ►  "}
                    </Button>
                    <Box></Box>
                </Box>
            </Box>
        );
    }

    private getExtensionCollection(): ExtensionContainer[] {
        const collection = [] as ExtensionContainer[];

        const extLoader = new ExtensionLoader(this.extensionFolderPath);
        const availableExt: string[] = extLoader.getAll();

        const extActivator = new Activator(path.join(process.cwd(), "extension.json"), availableExt);
        const extWatcher = new Watcher();

        availableExt.forEach((ext) => {
            const meta = extLoader.readMetadata(ext, extActivator, extWatcher);
            collection.push(new ExtensionContainer(meta));
        });

        return collection;
    }
}
