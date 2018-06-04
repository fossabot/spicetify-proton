import * as React from "react";
import { ColorContainer } from "./color-container";
import { Grid, render } from "proton-native";
import { GridWrapper } from "./grid-wrapper";
import { IDetailColor } from "./color-list";
import { Page } from "./page";
import { ThemeLoader } from "./theme-loader";

export interface IColorChanger {
    list: IDetailColor[];
    changer: (key: string, value: string) => void;
}

export class ColorSelect extends React.Component<IColorChanger> {
    private readonly maxCol = 4;
    private readonly maxRow = 4;
    private readonly maxEachGrid = this.maxCol * this.maxRow;
    private colorList: IDetailColor[];
    private changer: IColorChanger["changer"];
    private collection: GridWrapper[];

    constructor(props: IColorChanger) {
        super(props);
        this.colorList = props.list;
        this.changer = props.changer;
        const totalPage = Math.ceil(props.list.length / this.maxEachGrid);

        this.collection = [] as GridWrapper[];

        for (let i = 0; i < totalPage; i++) {
            const grid = new GridWrapper({
                children: this.getColorBox(i),
                padded: true,
            });

            this.collection.push(grid);
        }
    }

    public render() {
        return (
            <Page collection={this.collection} itemPerPage={1} />
        );
    }

    private getColorBox(stack: number): React.ReactNode {
        const collection = [] as React.ReactNode[];
        let curRow = 0;
        let curCol = 0;

        for (let i = stack * this.maxEachGrid; i < this.maxEachGrid; i++) {
            const detail = this.colorList[i];
            collection.push(
            <ColorContainer key={detail.id}
                changer={this.changer}
                color={detail.hex}
                column={curCol}
                id={detail.id}
                row={curRow}
            />);

            ++curCol;
            if (curCol === this.maxCol) {
                curCol = 0;
                ++curRow;
            }
        }
        return collection;
    }
}
