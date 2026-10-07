import * as React from 'react';
import Stack from '@mui/material/Stack';
import Home from "./Home";
import {Box, Container, Typography, useMediaQuery} from "@mui/material";
import {values} from "../../res/values";
import MainAppBar from "../../components/MainAppBar";
import MainFooter from "../../components/MainFooter";
import {useTheme} from "@mui/styles";
import {useState} from "react";
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
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("md"));

    const [focusSection, setFocusSection] = useState(0);

    return (
        <>
            <MainAppBar isSticky={focusSection !== 0} focusSection={focusSection} {...props}/>

            <Box id={"top"} />

            <Stack direction="column" pt={7} width={"auto"} height={"100%"}>

                <Scroller setSection={setFocusSection}>

                    {values.sections.map((item, index) => !item.layout ?
                        // <></>
                        <Home key={index} {...props} />
                        :
                        <Box
                            key={index}
                            id={`main_section_${index + 1}`}
                            bgcolor={item.bgColor}
                            py={15}
                        >
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
                                        sx={{
                                            fontWeight: 700,
                                            lineHeight: 1.6,
                                        }}
                                    >
                                        {item.title}
                                    </Typography>

                                    <Typography
                                        color={"textSecondary"}
                                        align={"center"}
                                        whiteSpace={"pre-line"}
                                        fontSize={breakpoint ? "1rem" : "1.125rem"}
                                        lineHeight={1.8}
                                        sx={{
                                            // "margin": "8px 0 32px",
                                            // "opacity": "0.7",
                                            // "fontSize": "16px",
                                            // "fontWeight": "500",
                                            // "lineHeight": "1.75",
                                            letterSpacing: "-0.5px",
                                        }}
                                    >
                                        {item.description}
                                    </Typography>

                                    <Box width={"100%"} pt={4}>
                                        {item.layout}
                                    </Box>
                                </Stack>
                            </ContainerSwitch>
                        </Box>
                    )}
                </Scroller>

                <MainFooter />
            </Stack>

        </>
    );
}

export default Main;