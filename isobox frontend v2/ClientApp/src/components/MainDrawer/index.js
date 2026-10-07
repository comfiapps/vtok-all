import * as React from 'react';
import Box from '@mui/material/Box';
import {
    IconButton, Stack,
    SwipeableDrawer,
    Typography, useMediaQuery
} from "@mui/material";
import {useTheme} from "@mui/styles";
import {CloseRounded} from "@mui/icons-material";
import {values} from "../../res/values";
import {useEffect, useState} from "react";
import ContactSection from "../ContactSection";

function MainDrawer({open, toggleDrawer, focusSection, moveToSection}) {
    const theme = useTheme();

    const [titles, setTitles] = useState([]);

    const toggle = (open) => (event) => {
        if (
            event &&
            event.type === 'keydown' &&
            (event.key === 'Tab' || event.key === 'Shift')
        ) return;

        toggleDrawer(open);
    };

    useEffect(() => {
        let array = [];
        values.sections.forEach((item, index) => Boolean(item.short) && array.push({...item, realIndex: index}));
        setTitles(array);
    }, [values.sections])

    const lineProps = {
        sx: {
            transition: ".5s",
        }
    }

    return (
        <SwipeableDrawer
            anchor={'right'}
            open={open}
            onClose={toggle(false)}
            onOpen={toggle(true)}
            PaperProps={{
                style: {
                    width: "100%",
                    maxWidth: "320px",
                    backgroundColor: theme.palette.primary.main,
                    padding: "94px 24px 56px",
                    boxSizing: "border-box",
                }
            }}
        >
            <Box
                role="presentation"
                onKeyDown={toggle(false)}
            >
                <IconButton
                    color={"secondary"}
                    size={"large"}
                    onClick={toggle(false)}
                    sx={{ position: "absolute", top: 0, right: 0 }}
                >
                    <CloseRounded fontSize={"large"} />
                </IconButton>

                <Stack
                    direction={"column"}
                    spacing={4}
                    pb={8}
                >

                    {titles.map((item, index) => Boolean(item.short) &&
                        <Stack
                            key={index}
                            direction={"row"}
                            spacing={0.8}
                            onClick={() => item.layout ? moveToSection(item.realIndex + 1, true) : moveToSection(null, true)}
                        >

                            <Box width={focusSection !== item.realIndex && "20px"} {...lineProps}/>

                            <Typography
                                variant={"caption"}
                                color={"primary.contrastText"}
                            >
                                {String(index + 1).padStart(2, '0')}
                            </Typography>

                            <Box
                                width={focusSection === item.realIndex && "20px"}
                                style={{
                                    "height": "1px",
                                    "margin": "11px 6px 24px",
                                    "backgroundColor": theme.palette.primary.contrastText
                                }}
                                {...lineProps}
                            />

                            <Typography
                                color={"primary.contrastText"}
                                textTransform={"uppercase"}
                                fontWeight={"bold"}
                                style={{
                                    "WebkitTextStroke": "1.2px #fafafa",
                                    "fontSize": "1.75rem",
                                    "lineHeight": 1.14,
                                    color: focusSection !== item.realIndex && "transparent",
                                    cursor: "pointer"
                                }}
                            >
                                {item.short}
                            </Typography>

                        </Stack>
                    )}

                </Stack>

                <ContactSection tiny={true} color={theme.palette.primary.main} />

            </Box>
        </SwipeableDrawer>
    );
}

export default MainDrawer;