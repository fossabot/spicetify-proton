import { Activator } from "./activator";
import { Watcher } from "./watcher";

export interface IMetadata {
    activator: Activator;
    author: string;
    description: string;
    id: string;
    name: string;
    path: string;
    watcher: Watcher;
}
