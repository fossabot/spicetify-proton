import React, { Component } from "react";
import { render, Box, Checkbox, ColorButton, Grid, Group, Text } from "proton-native";

export class ColorSelect extends Component {
    public render() {
        return (
            <Group title="Theme:">
                <Grid padded={true}>
                    <Box row={0} column={0}>
                        <Text>Main FG</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={0} column={1}>
                        <Text>Secondary FG</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={0} column={2}>
                        <Text>Main BG</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={0} column={3}>
                        <Text>Sidebar BG, player BG</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={1} column={0}>
                        <Text>Cover overlay, Shadow</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={1} column={1}>
                        <Text>Indicator FG, Button BG</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={1} column={2}>
                        <Text>Pressing FG</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={1} column={3}>
                        <Text>Slider BG</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={2} column={0}>
                        <Text>Sidebar indicator, Hover button BG</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={2} column={1}>
                        <Text>Scrollbar FG, Selected row BG</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={2} column={2}>
                        <Text>Pressing button FG</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={2} column={3}>
                        <Text>Pressing button BG</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={3} column={0}>
                        <Text>Selected button</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={3} column={1}>
                        <Text>Miscellaneous BG</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={3} column={2}>
                        <Text>Miscellaneous hover BG</Text>
                        <ColorButton padded={true}/>
                    </Box>
                    <Box row={3} column={3}>
                        <Text>Preserve</Text>
                        <ColorButton padded={true}/>
                    </Box>
                </Grid>
            </Group>
        );
    }
}
