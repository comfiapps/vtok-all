import * as React from 'react';

import {styled, useTheme} from "@mui/styles";
import Box from "@mui/material/Box";
import {useMediaQuery} from "@mui/material";

const Root = styled('div')(({theme}) => ({
    display: "flex",
    flexWrap: "wrap",
    justifyContent: "center",
}));

function PartnerSection() {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down(940));

    return (
        <Root>
            {Array.from(Array(15)).map((_, index) =>
                <Box p={1}>
                    <Box bgcolor={"gray"} width={breakpoint ? 160 : 272} style={{aspectRatio: "5/2"}}>
                    </Box>
                </Box>
            )}
        </Root>
    );
}

export default PartnerSection;