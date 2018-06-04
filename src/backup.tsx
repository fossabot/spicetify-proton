import * as fs from "fs";
import * as fsE from "fs-extra";
import * as path from "path";
import * as rimraf from "rimraf";
import { Dialog } from "proton-native";

export class Backup {
    private spotifyPath: string;
    private userPath: string;

    constructor(folderPath: string) {
        this.spotifyPath = folderPath;
        this.userPath = path.join(process.cwd(), "User\\Backup");
    }

    public startBackup() {
        if (!this.isSpotifyEmpty()) {
            if (!this.isUserEmpty()) {
                this.cleanBackup();
            }

            if (!fs.readdirSync(this.userPath)) {
                fs.mkdirSync(this.userPath);
            }

            try {
                fsE.copySync(this.spotifyPath, this.userPath);
            } catch (error) {
                Dialog("Error", {
                    description: `Cannot copying.\n${error}`,
                    title: "Backing up",
                });
            }
        }
    }

    /**
     * Whether backup folder has no SPA file.
     */
    public isUserEmpty(): boolean {
        return this.checkUsers() === 0;
    }

    /**
     * Whether Spotify\Apps folder has no SPA file.
     */
    public isSpotifyEmpty(): boolean {
        return this.checkSpotify()  === 0;
    }

    public cleanBackup(): void {
        if (!this.isUserEmpty()) {
            rimraf(this.userPath, (error) => {
                if (error) {
                    Dialog("Error", {
                        description: `Cannot delete backup.\n${error}`,
                        title: "Clean backup",
                    });
                }
            });
        }
    }

    public getBackupFileList(): string[] {
        return fs.readdirSync(this.userPath).map((item) => path.join(this.userPath, item));
    }

    private countSpa(folderPath: string): number {
        try {
            const folder = fs.readdirSync(folderPath);
            let spaCount = 0;
            folder.forEach((file) => {
                const stat = fs.statSync(path.join(folderPath, file));
                const extension = path.extname(file).toLowerCase();
                if (stat.isFile() && extension === ".spa") {
                    ++spaCount;
                }
            });
            return spaCount;
        } catch (error) {
            // console.log(folderPath, error)
            return 0;
        }
    }

    private checkSpotify(): number {
        return this.countSpa(this.spotifyPath);
    }

    private checkUsers(): number {
        return this.countSpa(this.userPath);
    }
}
