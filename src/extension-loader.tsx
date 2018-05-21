import * as fs from "fs";
import * as path from "path";
import { Activator } from "./activator";
import { Watcher } from "./watcher";

export interface ExtensionMetadata {
    activator: Activator;
    fileName: string;
    filePath: string;
    name: string;
    author: string;
    description: string;
    watcher: Watcher;
}

export class ExtensionLoader {
    private folderPath: string;

    constructor(folderPath: string) {
        this.folderPath = folderPath;
    }

    public getAll(): string[] {
        const dir = fs.readdirSync(this.folderPath);
        const content: string[] = [];
        dir.forEach((item: string) => {
            item = item.toLowerCase();

            const filePath = path.join(this.folderPath, item);
            const stat = fs.statSync(filePath);

            if (stat.isFile() && path.extname(item) === ".js") {
                content.push(item);
            }
        });
        return content;
    }

    public readMetadata(fileName: string, activator: Activator, watcher: Watcher): ExtensionMetadata {
        const filePath = path.join(this.folderPath, fileName);
        const data = fs.readFileSync(filePath, "utf-8");
        const metadata: ExtensionMetadata = {
            activator,
            author: "N/A",
            description: "N/A",
            fileName,
            filePath,
            name: fileName,
            watcher
        };

        if (data.match(/\/\/ START METADATA/) !== null) {
            const name = data.match(/\/\/ NAME: (.*)/);
            const author = data.match(/\/\/ AUTHOR: (.*)/);
            const description = data.match(/\/\/ DESCRIPTION: (.*)/);
            if (name !== null) {
                metadata.name = name[1];
            }

            if (author !== null) {
                metadata.author = author[1];
            }

            if (description !== null) {
                metadata.description = description[1];
            }
        }
        return metadata;
    }
}
