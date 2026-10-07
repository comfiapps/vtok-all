import * as React from 'react';

import Box from "@mui/material/Box";
import {Stack, Typography, useMediaQuery} from "@mui/material";
import strings from "../../res/strings";
import {useTheme} from "@mui/styles";

import SpecialTypography from "../../components/SpecialTypography";
import {values} from "../../res/values";
import HousePreview from "../../components/HousePreview";

function Overview() {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down(900));
    const mobile = useMediaQuery(theme.breakpoints.down(values.mobileBreakpoint));

    return (
        <Stack
            direction={breakpoint ? "column" : "row"}
            maxWidth={values.content_max}
            px={3}
            margin={"0 auto"}
            // alignItems={"center"}
            spacing={breakpoint ? 3 : 0}
            overflow={"hidden"}
        >
            <Stack
                flex={5.5}
                marginRight={breakpoint && "-7%"}
                marginLeft={breakpoint && "0%"}
            >
                <HousePreview />
            </Stack>

            <Box flex={0.5} />

            <Stack
                flex={4}
                alignItems={"center"}
                justifyContent={"center"}
                // minWidth={!breakpoint && 450}
            >

                <Typography
                    style={{
                        width: "100%",
                        "fontSize": "1.75rem",
                        "fontWeight": "bold",
                        "fontStretch": "normal",
                        "fontStyle": "normal",
                        "lineHeight": "normal",
                        "letterSpacing": "normal",
                        "color": "#49413c"
                    }}
                >
                    {strings.overview_subtitle}
                </Typography>

                <SpecialTypography
                    // variant={breakpoint ? "subtitle1" : "h6"}
                    // flexBasis={breakpoint ? 450 : 600}
                    // whiteSpace={!mobile && "pre-line"}
                    // flexGrow={mobile && 1}
                    // lineHeight={2}
                    // letterSpacing={breakpoint ? "-0.25px" : ".5px"}
                    my={2}
                    style={mobile ? {
                        "fontSize": "18px",
                        "lineHeight": "1.85",
                        "letterSpacing": "-0.25px",
                        fontWeight: 300,
                        "color": "#49413C",
                    } : {
                        "fontSize": "1.25rem",
                        "fontWeight": "300",
                        "lineHeight": "1.9",
                        "letterSpacing": "0.25px",
                        "color": "#49413c"
                    }}
                    subStyle={{
                        "fontWeight": "normal",
                        "color": "#1b110b"
                    }}
                    whiteSpace={"pre-line"}
                >
                    {strings.overview_content}
                </SpecialTypography>
            </Stack>
        </Stack>
    );
}

export default Overview;