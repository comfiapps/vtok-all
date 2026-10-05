import * as React from 'react';

import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import {Container, Stack, Typography, useMediaQuery} from "@mui/material";
import strings from "../../res/strings";
import {values} from "../../res/values";
import {useTheme} from "@mui/styles";

import gif1 from "../../assets/web.image_anim_avatar.webp"

function AbsoluteBox() {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down(958));
    const mobile = useMediaQuery(theme.breakpoints.down(776));

    return (
        <Box
            width={"100%"}
            style={{backgroundImage: 'linear-gradient(to left, #fcbb7b, #ff8032 100%)'}}
        >

            <Container maxWidth={values.breakpoint} style={{padding: mobile && 0}}>
                <Stack
                    spacing={3}
                    direction={"row"}
                    alignItems={"center"}
                    style={{
                        padding: mobile ? "0 0 0 24px" : "56px 24px",
                    }}
                >
                    <Typography
                        variant={breakpoint ? "subtitle1" : "h6"}
                        flexBasis={breakpoint ? 450 : 600}
                        whiteSpace={!mobile && "pre-line"}
                        fontWeight={!breakpoint && 450}
                        flexGrow={mobile && 1}
                        lineHeight={2}
                        letterSpacing={breakpoint ? "-0.25px" : ".5px"}
                        my={2}
                    >
                        <Typography variant={breakpoint ? "h5" : "h4"} component={"span"} fontWeight={900}>
                            {strings.isobox_description_bold}
                        </Typography>
                        {strings.isobox_description2}
                    </Typography>

{/*
                    {mobile ?
                        <Box
                            height={392}
                            style={{
                                aspectRatio: "160/392"
                            }}
                        >
                            <img src={gif1} width={"100%"}/>
                        </Box>
                        :
                        <Box
                            flex={1}
                            display={"flex"}
                            justifyContent={"end"}
                            alignItems={"center"}
                        >
                            <Box
                                position={"relative"}
                                maxWidth={376}
                                width={"100%"}
                                height={"100%"}
                            >
                                <Box
                                    position={"absolute"}
                                    left={0}
                                    right={0}
                                    style={{
                                        "top": "50%",
                                        "transform": "translateY(-50%)",
                                        aspectRatio: "376/720"
                                    }}
                                >
                                    <img src={gif1} height={"100%"}/>
                                </Box>
                            </Box>
                        </Box>
                    }
*/}

                </Stack>
            </Container>

        </Box>
    );
}

export default AbsoluteBox;