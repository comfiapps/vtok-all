import * as React from 'react';
import Stack from '@mui/material/Stack';
import {Box, Typography, useMediaQuery} from "@mui/material";
import strings from "../../res/strings";
import {styled, useTheme} from "@mui/styles";
import CountDownTimer from "../../components/CountDownTimer";
import MintBox from "../../components/MintBox";
import {useState, useEffect} from "react";

import bg from "../../assets/tile_page_bg.png"
import isobox from "../../assets/tile_logo_01.png"
import sentence from "../../assets/tile_logo_02.png"
import {getMintingStatus} from "../../api/apiRequests";
import {values} from "../../res/values";

function Home(props) {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down(900));
    const mobile = useMediaQuery(theme.breakpoints.down(values.mobileBreakpoint));

    const queryMode = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get("mode") : null;
    const [mode, setMode] = useState(queryMode === "1" ? 1 : 0);

    useEffect(() => {
        getMintingStatus(
            (success) => {
                switch (success) {
                    case "Wait": setMode(1); break;
                    case "Start": setMode(0); break;
                    default: break;
                }
            },
            () => {}
        );
    }, []);

    return (
        <Box
            style={{
                backgroundImage: `url('${bg}')`,
                backgroundPosition: "top",
                backgroundSize: "contain",
                backgroundRepeat: "no-repeat",
                width: "100%",
            }}
        >
            <Stack
                direction={breakpoint ? "column" : "row"}
                maxWidth={values.content_max}
                px={3}
                pt={"20%"}
                pb={"10%"}
                margin={"0 auto"}
                // alignItems={"center"}
                spacing={breakpoint ? 3 : 0}
            >
                <Stack flex={5} direction={"column"} alignItems={breakpoint && "center"} spacing={4}>
                    <img src={isobox} width={"100%"} style={{maxWidth: breakpoint && 500}}/>
                    <img src={sentence} width={"100%"} style={{maxWidth: 520, alignSelf: "center"}}/>
                    <Typography
                        style={mobile ? {
                            "margin": "12px 16px 32px",
                            "fontSize": "16px",
                            "fontWeight": "300",
                            "lineHeight": "2",
                            "color": "#76706d"
                        } : {
                            maxWidth: "650px",
                            "fontSize": "1.25rem",
                            "fontWeight": "300",
                            "fontStretch": "normal",
                            "fontStyle": "normal",
                            "lineHeight": "1.9",
                            "letterSpacing": "normal",
                            "color": "#76706d"
                        }}
                        whiteSpace={!breakpoint && "pre-line"}
                        align={breakpoint ? "center" : "left"}
                    >
                        {strings.top_content}
                    </Typography>
                </Stack>

                <Box flex={1} />

                <Stack
                    flex={4}
                    alignItems={"center"}
                    // minWidth={!breakpoint && 450}
                >
                    {mode === 0 ?
                        <MintBox toggle={() => setMode(1)} {...props}/>
                        :
                        <CountDownTimer toggle={() => setMode(0)} {...props}/>
                    }
                </Stack>
            </Stack>
        </Box>
    );
}

export default Home;