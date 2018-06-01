import * as React from "react";
import { render, Box, Button } from "proton-native";

export class ButtonAction extends React.Component {
    public render() {
        return(
            <Box stretchy={false} vertical={false}>
              <Button onClick={() => this.backup()}>Backup</Button>
              <Button onClick={() => this.clearBackup()}>Clear backup</Button>
              <Button onClick={() => this.openCSSFile()}>Edit CSS</Button>
              <Button onClick={() => this.pushCSS()}>Update CSS</Button>
              <Button onClick={() => this.restartSpotify()}>Restart</Button>
              <Button onClick={() => this.apply()}>Apply</Button>
            </Box>
        );
    }

    private backup(): void {
        const doSomethingLater = {};
    }
    private clearBackup(): void {
        const doSomethingLater = {};
    }
    private openCSSFile(): void {
        const doSomethingLater = {};
    }
    private pushCSS(): void {
        const doSomethingLater = {};
    }
    private restartSpotify(): void {
        const doSomethingLater = {};
    }
    private apply(): void {
        const doSomethingLater = {};
    }
}
