import React, { Component } from "react";
import { render, Box, Button, Form, Group, TextInput, Dialog } from "proton-native";

export class FolderPick extends Component {
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
