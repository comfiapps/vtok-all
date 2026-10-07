import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import strings, {getCurrentLanguageKey, languages, switchLanguage} from "../../res/strings";
import {Divider, IconButton, Popover, Stack, Typography, useMediaQuery} from "@mui/material";
import {styled, useTheme} from "@mui/styles";
import {values} from "../../res/values";
import Logo from "../../icons/Logo";
import Hamburger from "../../icons/Hamburger";
import MainDrawer from "../MainDrawer";
import {useEffect, useState} from "react";
import smoothscroll from 'smoothscroll-polyfill';
import SocialMediaButtonGroup from "../SocialMediaButtonGroup";

function MainAppBar({isSticky = false, focusSection, account, setAccount}) {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down(1200));

    smoothscroll.polyfill();

    const [drawerOpen, setDrawerOpen] = useState(false);
    const [anchorEl, setAnchorEl] = React.useState(null);

    const handleClose = () => setAnchorEl(null);

    const open = Boolean(anchorEl);
    const id = open ? 'simple-popover' : undefined;

    const openMenu = () => setDrawerOpen(true);

    const moveToSectionAfterDrawerClose = (...input) => {
        setDrawerOpen(false);
        setTimeout(() => moveToSection(...input), 50);
    }

    const moveToSection = (path) => {
        if (!path) path = "top";
        else path = `main_section_${path}`;

        const element = document.getElementById(path);
        element.scrollIntoView({behavior: 'smooth'});
    };

    const klaytn = window.klaytn;
    const [balance, setBalance] = useState(null);

    const connectWallet = async (event) => {
        setAnchorEl(event.currentTarget);
/*
        if (typeof klaytn !== 'undefined') {
            const accounts = await klaytn.enable();
            setAccount(accounts[0]);
        } else window.open('https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi', '_blank');
*/
    }

    const getUserBalance = async (address) => {
        await klaytn.sendAsync({method: 'klay_getBalance', params: [address, 'latest']},
            (err, result) => setBalance(result.result/Math.pow(10, 18)));
    }

    if (typeof klaytn !== 'undefined' && account) {
        klaytn.on('accountsChanged', account => setAccount(account));
        // klaytn.on('networkChanged', () => window.location.reload());
    } else setAccount(null);

    useEffect(() => {
        if (!account) setBalance(null);
        else getUserBalance(account.toString());
    }, [account]);

    // useEffect(() => connectWallet(), [klaytn]);

    return (
        <>
            {breakpoint &&
                <MainDrawer
                    open={drawerOpen}
                    toggleDrawer={setDrawerOpen}
                    focusSection={focusSection}
                    moveToSection={moveToSectionAfterDrawerClose}
                />
            }

            <AppBar
                position={"fixed"}
                color={"transparent"}
                elevation={0}
            >
                <Toolbar
                    style={{
                        transition: ".2s",
                        maxWidth: theme.breakpoints.values.lg,
                        width: "100%",
                        margin: "0 auto",
                        boxSizing: "border-box",
                        "backgroundColor": isSticky ? "rgba(255, 255, 255, 0.98)" : "rgba(255, 255, 255, 0.5)",
                        borderBottom: "1px solid transparent",
                        borderColor: isSticky ? "rgba(0,27,55,0.1)" : "transparent",
                    }}
                >
                    <Stack
                        direction={"row"}
                        spacing={breakpoint ? 2 : 3}
                        alignItems={"center"}
                        maxWidth={values.content_max}
                        flexGrow={1}
                        margin={"0 auto"}
                    >
                        <Logo
                            color={"primary"}
                            fontSize={"large"}
                            onClick={() => moveToSection()}
                            style={{cursor: "pointer"}}
                        />

                        {!breakpoint &&
                            <Stack direction={"row"} spacing={4}>
                                {values.sections.map((item, index) => Boolean(item.short) &&
                                    <Button
                                        key={index}
                                        color="inherit"
                                        size={"large"}
                                        disableRipple
                                        onClick={() => item.layout ? moveToSection(index + 1) : moveToSection()}
                                        sx={{
                                            color: focusSection === index ? theme.palette.primary.main : theme.palette.text.secondary,
                                            opacity: focusSection !== index && .4,
                                            textTransform: item.shortNoUppercase && "none"
                                        }}
                                    >
                                        {item.short}
                                    </Button>
                                )}
                            </Stack>
                        }

                        <Box flexGrow={1} />

                        {!breakpoint && <SocialMediaButtonGroup />}

                        <Stack
                            direction={"row"}
                            alignItems={"center"}
                            style={{
                                height: breakpoint ? 33 : 40,
                                "borderRadius": "8px",
                                "border": "solid 1px #ddd",
                                "backgroundColor": "#fff",
                            }}
                            color={"secondary"}
                        >
                            {languages.map((item, index) =>
                                <React.Fragment key={index}>
                                    <Button
                                        style={{
                                            height: "100%",
                                            "fontSize": "14px",
                                            "fontWeight": "500",
                                            "fontStretch": "normal",
                                            "fontStyle": "normal",
                                            "lineHeight": "1.43",
                                            "letterSpacing": "normal",
                                            "textAlign": "center",
                                            "color": "#49413c",
                                            opacity: getCurrentLanguageKey() === item.key ? 1 : .3,
                                        }}
                                        onClick={() => switchLanguage(item.key)}
                                    >
                                        {item.short}
                                    </Button>

                                    {index < languages.length - 1 && <Divider orientation={"vertical"} style={{height: 12}} /> }
                                </React.Fragment>
                            )}
                        </Stack>

                        <Button
                            variant={"contained"}
                            color="primary"
                            disableRipple
                            disableElevation
                            size={"medium"}
                            sx={{
                                borderRadius: "8px",
                                paddingX: breakpoint ? "16px" : "30px",
                                fontSize: breakpoint && "12px"
                            }}
                            onClick={connectWallet}
                        >
                            {account && balance != null ? `${balance.toFixed(2)} KLAY` : strings.wallet}
                        </Button>

                        {breakpoint &&
                            <IconButton
                                color="inherit"
                                onClick={openMenu}
                                sx={{ marginLeft: 0 }}
                            >
                                <Hamburger />
                            </IconButton>
                        }

                    </Stack>
                </Toolbar>
            </AppBar>

            <Popover
                id={id}
                open={open}
                anchorEl={anchorEl}
                onClose={handleClose}
                anchorOrigin={{
                    vertical: 'bottom',
                    horizontal: 'right',
                }}
                transformOrigin={{
                    vertical: 'top',
                    horizontal: 'right',
                }}
                style={{
                    marginTop: 8,
                }}
                PaperProps={{
                    sx: {
                        background: "#424242",
                        color: "white",
                        "boxShadow":
                            "0px 5px 5px -3px rgb(0 0 0 / 20%)," +
                            "0px 8px 10px 1px rgb(0 0 0 / 10%)," +
                            "0px 3px 14px 2px rgb(0 0 0 / 12%)"
                    }
                }}
            >
                <Typography sx={{ px: 2.5, py: 1.5 }}>{strings.minting_not_started}</Typography>
            </Popover>
        </>
    );
}

export default MainAppBar;