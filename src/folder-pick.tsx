import * as React from "react";
import {
    Box,
    Button,
    Dialog,
    Form,
    Group,
    render,
    TextInput,
    } from "proton-native";

export class FolderPick extends React.Component {
    constructor(props: {}) {
        super(props);
        // Add a bridge with ButtonAction since backupAction need to know where Spotify is
    }
    public render() {
        return (
            <Box vertical={false}>
                <Form><TextInput />Spotify folder:</Form>
                <Button stretchy={false} onClick={() => this.chooseFolder()}>Open</Button>
            </Box>
        );
    }

    private chooseFolder() {
        Dialog("Open");
    }
}
