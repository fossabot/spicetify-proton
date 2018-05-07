import React, { Component } from "react";
import { render, Box, Button, Form, Group, TextInput } from "proton-native";

export class FolderPick extends Component {
    public render() {
        return (
            <Box vertical={false}>
                <Form><TextInput label="Spotify folder" /></Form>
                <Button>Open</Button>
            </Box>
        );
    }
}
