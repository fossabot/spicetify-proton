import * as fs from "fs";

interface WatcherContainer {
    [key: string]: fs.FSWatcher;
}

export class Watcher {
    private list: WatcherContainer;

    constructor() {
        this.list = {};
    }
    public watch(path: string, callback: (event: string, filename: string) => any): void {
        this.list[path] = fs.watch(path, callback);
    }

    public unwatch(path: string): void {
        if (this.list[path] !== undefined) {
            this.list[path].close();
            delete this.list[path];
        }
    }
}
