import * as React from 'react';

import Stack from '@mui/material/Stack';
import {useTheme} from "@mui/styles";
import {Box, Container, Typography, useMediaQuery} from "@mui/material";
import strings from "../../res/strings";
import {values} from "../../res/values";
import {useState} from "react";

import pic from "../../assets/scene1.webp"
import SpecialTypography from "../../components/SpecialTypography";

function StoryBox() {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down(850));
    const mobile = useMediaQuery(theme.breakpoints.down(values.mobileBreakpoint));

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Container
            /*maxWidth={values.breakpoint}*/
            style={{
                maxWidth: 1000,
                overflow: "hidden"
            }}
        >

            <Stack
                position={"relative"}
                direction={"column"}
                px={3}
            >

                <div>
                    {!breakpoint &&
                        <img
                            src={pic}
                            style={{
                                marginRight: breakpoint ? 0 : "-60px",
                                marginTop: breakpoint ? "24px" : "-35px",
                                maxWidth: 480,
                                width: "100%",
                                float: breakpoint ? "bottom" : "right",
                            }}
                        />
                    }

                    <div>
                        <Typography
                            variant={"h5"}
                            fontWeight={"bold"}
                            style={mobile ? {
                                "fontSize": "1.25rem",
                                "letterSpacing": "-0.25px",
                                "color": "#49413c",
                            } : {
                                "fontSize": "1.75rem",
                                "letterSpacing": "-0.5px",
                                "color": "#49413c",
                            }}
                            pb={2.1}
                        >
                            {strings.story_subtitle}
                        </Typography>

                        <SpecialTypography
                            variant={"h6"}
                            fontWeight={300}
                            whiteSpace={"pre-line"}
                            lineHeight={2}
                            style={mobile ? {
                                "fontSize": "1.125rem",
                                "letterSpacing": "-0.25px",
                                "color": "#49413c"
                            } : {
                                "fontSize": "1.25rem",
                                "fontWeight": "300",
                                "fontStretch": "normal",
                                "fontStyle": "normal",
                                "lineHeight": "1.9",
                                "letterSpacing": "0.25px",
                                "color": "#49413c"
                            }}
                            subStyle={{
                                "fontWeight": "normal",
                                "color": "#1b110b"
                            }}
                        >
                            {strings.story_content}
                        </SpecialTypography>
                    </div>
                </div>

                {breakpoint &&
                    <img
                        src={pic}
                        style={{
                            margin: "0 auto",
                            maxWidth: 480,
                            width: "100%",
                            transformOrigin: "right bottom",
                        }}
                    />
                }
            </Stack>

        </Container>
    );
}

export default StoryBox;