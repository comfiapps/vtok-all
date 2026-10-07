import * as React from 'react';
import Stack from '@mui/material/Stack';
import Home from "./Home";
import {Box, Container, Typography, useMediaQuery, useScrollTrigger} from "@mui/material";
import {values} from "../../res/values";
import MainAppBar from "../../components/MainAppBar";
import MainFooter from "../../components/MainFooter";
import {useTheme} from "@mui/styles";
import {useEffect, useState} from "react";
import Scroller from "../../res/scroller";

function ContainerSwitch({noContainer, ...props}) {

    if (noContainer) return <>{props.children}</>
    return (
        <Container maxWidth={noContainer && values.breakpoint} style={{height: "100%"}}>
            {props.children}
        </Container>
    )
}

function Main(props) {
    const { window } = props;
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down(values.mobileBreakpoint));

    const [focusSection, setFocusSection] = useState(0);

    const trigger = useScrollTrigger({
        disableHysteresis: true,
        threshold: 200,
        target: window ? window() : undefined,
    });

    return (
        <>
            <MainAppBar isSticky={trigger} focusSection={focusSection} {...props}/>

            <Box id={"top"} />

            <Box
                maxWidth={"lg"}
                margin={"0 auto"}
                width={"100%"}
                style={{
                    "boxShadow": "0 2px 80px 0 rgba(0, 0, 0, 0.14)",
                    "backgroundColor": "#fff"
                }}
            >
                <Stack direction="column" width={"auto"} height={"100%"} overflow={"hidden"}>

                    <Scroller setSection={setFocusSection}>

                        {values.sections.map((item, index) => !item.layout ?
                            <Home key={index} {...props} />
                            :
                            <Box
                                key={index}
                                // id={`main_section_${index + 1}`}
                                bgcolor={item.bgColor}
                                position={"relative"}
                                style={mobile ? {
                                    paddingTop: item.big_pt ? "30%" : "15%",
                                    paddingBottom: item.big_pb ? "30%" : "15%",
                                } : {
                                    paddingTop: (item.short || item.big_pt) ? 240 : 120,
                                    paddingBottom: item.big_pb ? 240 : 120,
                                }}
                            >
                                <Box
                                    position={"absolute"}
                                    top={mobile ? 0 : item.scrollTop ? item.scrollTop : 60}
                                    id={`main_section_${index + 1}`}
                                />

                                <ContainerSwitch noContainer={item.noContainer}>
                                    <Stack
                                        direction={"column"}
                                        alignItems={"center"}
                                        sx={{
                                            color: item.isDark && "white",
                                        }}
                                        height={"100%"}
                                    >
                                        <Typography
                                            variant={"h4"}
                                            color={"#1b110b"}
                                            fontWeight={900}
                                            sx={mobile ? {
                                                "fontSize": "3rem",
                                                "letterSpacing": "1px",
                                                textTransform: item.cap_title ? "uppercase" : "none"
                                            } : {
                                                "fontSize": "3.5rem",
                                                "WebkitTextStroke": item.emphasize_title && "2px #1b110b",
                                                "letterSpacing": item.emphasize_title ? "0.06 rem" : "2px",
                                                textTransform: item.cap_title ? "uppercase" : "none"
                                            }}
                                            mb={1.5}
                                        >
                                            {item.title}
                                        </Typography>

                                        {item.subtitle &&
                                            <Typography
                                                variant={"h5"}
                                                sx={{
                                                    "fontSize": "2rem",
                                                    "fontWeight": "bold",
                                                    "color": "#49413c",
                                                    textTransform: item.cap_subtitle ? "uppercase" : "none"
                                                }}
                                                align={"center"}
                                                mb={2}
                                                px={item.noContainer && 2}
                                            >
                                                {item.subtitle}
                                            </Typography>
                                        }

                                        {item.description &&
                                            <Typography
                                                color={"#49413c"}
                                                align={"center"}
                                                whiteSpace={"pre-line"}
                                                // fontSize={mobile ? "1rem" : "1.125rem"}
                                                lineHeight={1.67}
                                                sx={mobile ? {
                                                    "fontSize": item.big_description ? "1.125rem" : "1rem",
                                                    "lineHeight": item.big_description ? "1.5" : "1.67",
                                                    "letterSpacing": "-0.25px",
                                                } : {
                                                    fontSize: item.big_description ? "1.5rem" : item.title ? "1.25rem" : "1.125rem",
                                                    "letterSpacing": item.big_description ? 0 : "-0.25px",
                                                }}
                                            >
                                                {item.description}
                                            </Typography>
                                        }

                                        <Box width={"100%"} pt={4}>
                                            {item.layout}
                                        </Box>
                                    </Stack>
                                </ContainerSwitch>
                            </Box>
                        )}
                    </Scroller>

                </Stack>
            </Box>

            <MainFooter />
        </>
    );
}

export default Main;