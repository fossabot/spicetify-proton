import * as path from "path";
import * as React from "react";
import { Backup } from "./backup";
import { Box, Button, render } from "proton-native";
import { Extractor } from "./extractor";
import { homedir } from "os";

export class ButtonAction extends React.Component {
    private backup: Backup;
    private extractor: Extractor;

    public constructor(props: {}) {
        super(props);
        this.backup = new Backup(
            // This path will be set by FolderPick.
            path.join(homedir(), "AppData/Roaming/Spotify/Apps"),
        );
        // Bridge this one too
        this.extractor = new Extractor(path.join(process.cwd(), "Extracted"));
    }
    public render() {
        return(
            <Box stretchy={false} vertical={false}>
              <Button onClick={() => this.backupAction()}>Backup</Button>
              <Button onClick={() => this.clearBackup()}>Clear backup</Button>
              <Button onClick={() => this.openCSSFile()}>Edit CSS</Button>
              <Button onClick={() => this.pushCSS()}>Update CSS</Button>
              <Button onClick={() => this.restartSpotify()}>Restart</Button>
              <Button onClick={() => this.apply()}>Apply</Button>
              <Button onClick={() => this.tryExtract()}>CHÓ NÁCH</Button>
              <Button onClick={() => this.tryExtract()}>CU TEO</Button>
            </Box>
        );
    }

    private tryExtract(): any {
        const list = this.backup.getBackupFileList();
        list.forEach((item) => {
            this.extractor.extract(item);
        });
    }

    private backupAction(): void {
        this.backup.startBackup();
    }
    private clearBackup(): void {
        this.backup.cleanBackup();
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
