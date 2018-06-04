import * as React from "react";
import { ExtensionContainer } from "./extension-container";
import { IMetadata } from "./metadata";
import { Page } from "./page";

interface ExtensionProp {
    collection: IMetadata[];
}

export class Extension extends React.Component<ExtensionProp> {
    private readonly extensionFolderPath = "./User/Extensions";
    private collection: ExtensionContainer[];

    public constructor(props: ExtensionProp) {
        super(props);

        this.collection = [];

        props.collection.forEach((meta) => {
            this.collection.push(new ExtensionContainer({metadata: meta}));
        });
    }

    public render() {
        return (<Page collection={this.collection} itemPerPage={3} />);
    }
}
