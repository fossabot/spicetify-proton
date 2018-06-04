import * as fs from "fs";
import * as path from "path";
import { Activator } from "./activator";
import { IMetadata } from "./metadata";
import { Watcher } from "./watcher";

export class ExtensionLoader {
    public collection: IMetadata[];

    private folderPath: string;
    private storagePath: string;

    constructor(folderPath?: string, storage?: string) {
        if (folderPath !== undefined) {
            this.folderPath = folderPath;
        } else {
            this.folderPath = path.join(process.cwd(), "User\\Extensions");
        }

        if (storage !== undefined) {
            this.storagePath = storage;
        } else {
            this.storagePath = path.join(process.cwd(), "extension.json");
        }

        const list = this.getList();

        const activator = new Activator(this.storagePath, list);
        const watcher = new Watcher();
        this.collection = list.map((item) => {
            const meta = this.readMetadata(item);
            return {
                activator,
                author: meta.author,
                description: meta.description,
                id: item,
                name: meta.name,
                path: meta.filePath,
                watcher,
            } as IMetadata;
        });
    }

    private getList(): string[] {
        let dir: string[] = [];

        try {
            dir = fs.readdirSync(this.folderPath);
        } catch (e) {
            fs.mkdirSync(this.folderPath);
            return [];
        }

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

    private readMetadata(fileName: string) {
        const filePath = path.join(this.folderPath, fileName);
        const data = fs.readFileSync(filePath, "utf-8");
        let name = fileName;
        let author = "N/A";
        let description = "N/A";

        if (data.match(/\/\/ START METADATA/) !== null) {
            const rawName = data.match(/\/\/ NAME: (.*)/);
            const rawAuthor = data.match(/\/\/ AUTHOR: (.*)/);
            const rawDescription = data.match(/\/\/ DESCRIPTION: (.*)/);
            if (rawName !== null) {
                name = rawName[1];
            }

            if (rawAuthor !== null) {
                author = rawAuthor[1];
            }

            if (rawDescription !== null) {
                description = rawDescription[1];
            }
        }
        return { author, description, filePath, name };
    }
}
