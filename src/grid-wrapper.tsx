import * as React from "react";
import { Grid, GridProps } from "proton-native";

interface GridWrapperProps extends GridProps {
    children: React.ReactNode;
}

export class GridWrapper extends React.Component<GridWrapperProps> {
    constructor(props: GridWrapperProps) {
        super(props);
    }

    public render() {
        return (
            <Grid
                padded={this.props.padded}
                enabled={this.props.enabled}
                visible={this.props.visible}
            >
                {this.props.children}
            </Grid>
        );
    }
}
