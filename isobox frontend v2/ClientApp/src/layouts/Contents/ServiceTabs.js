import * as React from 'react';

import {useTheme} from "@mui/styles";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import {Button, Container, Grid, Typography, useMediaQuery} from "@mui/material";
import {values} from "../../res/values";

function Tabs({value, handleChange}) {
    const theme = useTheme();

    return (
        <Grid container spacing={1} maxWidth={500}>
            {values.serviceContents.map((item, index) =>
                <Grid key={index} item xs={6}>
                    <Button
                        variant={"contained"}
                        size={"large"}
                        disableElevation
                        disableRipple
                        fullWidth
                        style={{
                            height: "48px",
                            borderRadius: "10px",
                            backgroundColor: value !== index && `${theme.palette.primary.main}1A`,
                            color: value !== index && "#be9f8a",
                        }}
                        onClick={() => handleChange(index)}
                    >
                        {item.title}
                    </Button>
                </Grid>
            )}
        </Grid>
    );
}

function ServiceTabs() {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down(840));
    const mobile = useMediaQuery(theme.breakpoints.down(values.mobileBreakpoint));

    const queryTab = typeof window !== 'undefined' ? new URLSearchParams(window.location.search).get("tab") : null;
    const [value, setValue] = useState(queryTab !== null ? Number(queryTab) : 0);
    const [horizontal, setHorizontal] = useState(false);

    const handleChange = (newValue) => setValue(newValue);

    useEffect(() => {
        if (breakpoint) setHorizontal(true);
        else setHorizontal(false);
    }, [breakpoint]);

    useEffect(() => {
        const timeout = setInterval(() => {
            setValue(val => values.serviceContents.length > val + 1 ? val + 1 : 0);
        }, 5000);
        return () => clearInterval(timeout);
    }, [value]);

    return (
        <Container style={{maxWidth: values.content_max - 200, marginTop: -40}}>

            <Stack direction={horizontal ? "column-reverse" : "row"} spacing={breakpoint ? 4 : 0}>

                <Stack direction={"column"} spacing={breakpoint ? 1 : 3} flex={1}>
                    <Typography
                        variant={mobile ? "h6" : "h2"}
                        fontSize={mobile && "2.5rem"}
                        fontWeight={900}
                        pl={1}
                    >
                        {values.serviceContents[value].title}
                    </Typography>

                    <Typography
                        flexGrow={1}
                        fontSize={"1.125rem"}
                        lineHeight={1.71}
                        minHeight={mobile && "120px"}
                        color={"#49413c"}
                        pl={1}
                    >
                        {values.serviceContents[value].description}
                    </Typography>

                    {!breakpoint && <Tabs value={value} handleChange={handleChange}/>}
                </Stack>

                {!breakpoint && <Box flex={.18} />}

                <Box flex={1}
                     maxWidth={500}
                     width={"100%"}
                     alignSelf={"center"}
                >
                    {values.serviceContents.map((item, index) =>
                        <div
                            key={index}
                            role="tabpanel"
                            hidden={value !== index}
                            style={{
                                maxWidth: 480,
                                margin: "0 auto"
                            }}
                        >
                            <Box
                                // height={"100%"}
                                width={"100%"}
                                boxSizing={"border-box"}
                                margin={"0 auto"}
                                sx={{
                                    paddingTop: "100%",
                                    // aspectRatio: "1/1",
                                    borderRadius: 6,
                                    backgroundColor: "#eee",

                                    backgroundImage: `url('${item.image}')`,
                                    backgroundPosition: "center",
                                    backgroundSize: "contain",
                                    backgroundRepeat: "no-repeat"
                                }}
                            >

                            </Box>
                        </div>
                    )}
                </Box>

                {breakpoint &&
                    <Box alignSelf={"center"}>
                        <Tabs value={value} handleChange={handleChange}/>
                    </Box>
                }
            </Stack>

        </Container>
    );
}

export default ServiceTabs;