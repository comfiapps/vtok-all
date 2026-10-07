import * as React from 'react';

import {useTheme} from "@mui/styles";
import Box from "@mui/material/Box";
import {useEffect, useState} from "react";
import Stack from "@mui/material/Stack";
import {Button, Container, Grid, Typography, useMediaQuery} from "@mui/material";
import {values} from "../../res/values";

function ServiceTabs() {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down(840));

    const [value, setValue] = useState(0);
    const [horizontal, setHorizontal] = useState(false);

    const handleChange = (newValue) => setValue(newValue);

    useEffect(() => {
        if (breakpoint) setHorizontal(true);
        else setHorizontal(false);
    }, [breakpoint]);

    useEffect(() => {
        const timeout = setInterval(() => {
            setValue(val => values.serviceContents.length > val + 1 ? val + 1 : 0);
        }, 3000);
        return () => clearInterval(timeout);
    }, [value]);

    return (
        <Container maxWidth={"md"}>

            <Stack direction={horizontal ? "column-reverse" : "row"} spacing={breakpoint ? 3 : 10}>

                <Stack direction={"column"} spacing={2} flex={1}>
                    <Typography variant={breakpoint ? "h6" : "h2"} fontSize={breakpoint && "2.5rem"} fontWeight={900}>
                        {values.serviceContents[value].title}
                    </Typography>

                    <Typography
                        flexGrow={1}
                        fontSize={breakpoint ? "1rem" : "1.125rem"}
                        lineHeight={breakpoint ? 1.6 : 1.78}
                        letterSpacing={"-0.25px"}
                        height={breakpoint && "120px"}
                    >
                        {values.serviceContents[value].description}
                    </Typography>

                    <Grid container spacing={1}>
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
                </Stack>

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
                        >
                            <Box
                                maxWidth={500}
                                // height={"100%"}
                                width={"100%"}
                                boxSizing={"border-box"}
                                margin={"0 auto"}
                                sx={{
                                    paddingTop: "100%",
                                    aspectRatio: "1/1",
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

            </Stack>

        </Container>
    );
}

export default ServiceTabs;