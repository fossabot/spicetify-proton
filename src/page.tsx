import * as React from "react";
import { Box, Button, Text } from "proton-native";

interface IEachPage {
    collection: React.Component[];
    itemPerPage: number;
}

export class Page extends React.Component<IEachPage, { content: React.ReactNode }> {
    private totalPage: number;
    private currentPage: number = 0;

    private collection: React.Component[];
    private itemCount: number;
    private itemPerPage: number;

    public constructor(props: IEachPage) {
        super(props);
        this.collection = props.collection;
        this.itemPerPage = props.itemPerPage;
        this.itemCount = this.collection.length;
        this.totalPage = Math.ceil(this.itemCount / this.itemPerPage);
        this.state = {
            content: this.collection.slice(0, this.itemPerPage).map((item) => item.render()),
        };
    }

    public changePage(direction: -1 | 0 | 1): void {
        const newPage = this.currentPage + direction;
        if (newPage >= 0 && newPage < this.totalPage)  {
            this.currentPage = newPage;
        }
        const start = this.currentPage * this.itemPerPage;
        this.setState({
            content: this.collection.slice(start, start + this.itemPerPage).map((item) => item.render()),
        });
    }

    public render() {
        return (
            <Box>
                <Box>{this.state.content}</Box>
                <Box padded stretchy={false} vertical={false}>
                    <Box></Box>
                    <Button
                        onClick={() => this.changePage(-1)}
                        stretchy={false}>{"  ◄  "}
                    </Button>
                    <Box stretchy={false}>
                        <Box></Box>
                        <Text stretchy={false}>{`${this.currentPage + 1} / ${this.totalPage}`}</Text>
                        <Box></Box>
                    </Box>
                    <Button
                        onClick={() => this.changePage(1)}
                        stretchy={false}>{"  ►  "}
                    </Button>
                    <Box></Box>
                </Box>
            </Box>
        );
    }
}
