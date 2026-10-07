import * as React from 'react';

import Stack from '@mui/material/Stack';
import {useTheme} from "@mui/styles";
import StoryBox from "./Story";
import PetBox from "./Pet";
import AbsoluteBox from "./AbsoluteBox";
import ServiceTabs from "./ServiceTabs";

function ServiceSection() {
    const theme = useTheme();

    return (
        <Stack
            direction={"column"}
            spacing={25}
            alignItems={"center"}
            height={"100%"}
            style={{overflow: "hidden", boxSizing: "border-box"}}
        >
            <StoryBox />
            <PetBox />
            <AbsoluteBox />
            <ServiceTabs/>
        </Stack>
    );
}

export default ServiceSection;