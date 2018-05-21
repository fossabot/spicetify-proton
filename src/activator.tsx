import * as fs from "fs";

export class Activator {
    public list: string[];
    private storage: string;

    constructor(storage: string, availableList?: string[]) {
        this.storage = storage;
        this.list = this.parseList();

        if (availableList !== undefined) {
            this.syncList(this.list, availableList);
        }
    }

    public getState(key: string): boolean {
        key = key.toLowerCase();
        return this.list.indexOf(key) !== -1;
    }

    public activate(key: string): void {
        key = key.toLowerCase();
        const index = this.list.indexOf(key);

        if (index === -1) {
            this.list.push(key);
            this.writeList(this.list);
        }
    }

    public deactivate(key: string): void {
        key = key.toLowerCase();
        const index = this.list.indexOf(key);

        if (index !== -1) {
            this.list.splice(index, 1);
            this.writeList(this.list);
        }
    }

    private parseList(): string[] {
        let parsed: string[] = [];

        try {
            const file = fs.readFileSync(this.storage, "utf-8");
            parsed = JSON.parse(file);
        } catch (e) {
            this.writeList([]);
        }

        parsed = parsed.map((key: string) => key.toLowerCase());

        return parsed;
    }

    private writeList(list: string[]): void {
        fs.writeFileSync(this.storage, JSON.stringify(list), "utf-8");
    }

    /**
     * Remove obsoleted item in base list by checking with available list
     * @param base List read from storage file
     * @param available List of file currently available in folder
     */
    private syncList(base: string[], available: string[]): void {
        base.forEach((item: string, index: number) => {
            const n = available.indexOf(item);

            if (n === -1) {
                base.splice(index, 1);
            }
        });
    }
}
