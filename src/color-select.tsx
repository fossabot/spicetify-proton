import * as React from "react";
import { render, Grid } from "proton-native";
import { ColorContainer } from "./color-container";
import { ThemeLoader } from "./theme-loader";

export class ColorSelect extends React.Component {
    private readonly maxCol = 4;

    public render() {
        return (
            <Grid padded>
                {this.getColorBox()}
            </Grid>
        );
    }

    private getColorBox() {
        const loader = new ThemeLoader();
        const colorList = loader.theme;
        const collection = [] as JSX.Element[];
        let curRow = 0;
        let curCol = 0;

        Object.keys(colorList).forEach((varName: string) => {
            collection.push(new ColorContainer({
                color: colorList[varName],
                column: curCol,
                row: curRow,
                var: varName,
            }).render());

            ++curCol;
            if (curCol === this.maxCol) {
                curCol = 0;
                ++curRow;
            }
        });
        return collection;
    }
}
