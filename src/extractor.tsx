import * as fs from "fs";
import * as fsE from "fs-extra";
import * as path from "path";
import { Dialog } from "proton-native";
import { exec } from "child_process";
import { path7za } from "7zip-bin";

export class Extractor {
    private destination: string;

    constructor(folderPath: string) {
        this.destination = folderPath;
        try {
            fs.readdirSync(this.destination);
        } catch (e) {
            fs.mkdirSync(this.destination);
        }
    }

    public extract(filePath: string) {
        const nameOnly = path.parse(filePath).name;
        const commandRaw = `${path7za} x -r -o"${this.destination}/Raw/${nameOnly}" "${filePath}"`;
        const commandTheme = `${path7za} x -r -i!*.js -i!*.html -i!*.css -o"${
            this.destination
        }/Themed/${nameOnly}" "${filePath}"`;
        // Extract to Raw
        exec(commandRaw, { windowsHide: true }, (err): void => {
            if (err) {
                Dialog("Error", {
                    description: err.message,
                    title: "Extracting to Raw",
                });
            }
        });

        // Extract to Themed
        exec(commandTheme, { windowsHide: true }, (err): void => {
            if (err) {
                Dialog("Error", {
                    description: err.message,
                    title: "Extracting to Raw",
                });
            }
        });
    }
}
