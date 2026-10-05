import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Button from '@mui/material/Button';
import strings from "../../res/strings";
import {IconButton, Stack} from "@mui/material";
import {styled, useTheme} from "@mui/styles";
import {values} from "../../res/values";
import Logo from "../../icons/Logo";
import Hamburger from "../../icons/Hamburger";
import MainDrawer from "../MainDrawer";
import {useEffect, useState} from "react";
import smoothscroll from 'smoothscroll-polyfill';

const StyledToolbar = styled(Toolbar)(({theme}) => ({
    width: "100%",
    maxWidth: theme.breakpoints.values.lg,
    margin: "0 auto",
    boxSizing: "border-box",

}));

function MainAppBar({isSticky = false, focusSection, account, setAccount}) {
    const theme = useTheme();
    smoothscroll.polyfill();

    const [drawerOpen, setDrawerOpen] = useState(false);

    const openMenu = () => setDrawerOpen(true);

    const moveToSection = (path) => {
        if (!path) path = "top";
        else path = `main_section_${path}`;

        const element = document.getElementById(path);
        element.scrollIntoView({behavior: 'smooth'});
    };

    const klaytn = window.klaytn;
    const [balance, setBalance] = useState(null);

    const connectWallet = async () => {
        if (typeof klaytn !== 'undefined') {
            const accounts = await klaytn.enable();
            setAccount(accounts[0]);
        } else window.open('https://chrome.google.com/webstore/detail/kaikas/jblndlipeogpafnldhgmapagcccfchpi', '_blank');
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
            <MainDrawer
                open={drawerOpen}
                toggleDrawer={setDrawerOpen}
                focusSection={focusSection}
                moveToSection={moveToSection}
            />

            <AppBar
                position={isSticky ? "fixed" : "absolute"}
                color={isSticky ? "inherit" : "transparent"}
                style={{boxShadow: "none", backgroundColor: "white"}}
            >
                <StyledToolbar>
                    <Logo
                        color={"primary"}
                        fontSize={"large"}
                        onClick={() => moveToSection()}
                        style={{cursor: "pointer"}}
                    />

                    <Box minWidth={64} flexGrow={1} />

                    <Stack
                        direction={"row"}
                        spacing={4}
                    >
                        {values.sections.map((item, index) => Boolean(item.short) &&
                            <Button
                                key={index}
                                color="inherit"
                                size={"large"}
                                disableRipple
                                onClick={() => item.layout ? moveToSection(index + 1) : moveToSection()}
                                sx={{
                                    display: { xs: 'none', md: 'flex' },
                                    color: focusSection === index ? theme.palette.primary.main : theme.palette.text.secondary,
                                    opacity:  focusSection !== index && .4
                                }}
                            >
                                {item.short}
                            </Button>
                        )}

                        {/*<Button
                            variant={"contained"}
                            color="primary"
                            disableRipple
                            disableElevation
                            size={"large"}
                            sx={{
                                borderRadius: "14px",
                                paddingX: "30px"
                            }}
                            onClick={connectWallet}
                        >
                            {account && balance != null ? `${balance.toFixed(2)} KLAY` : strings.wallet}
                        </Button>*/}

                        <IconButton
                            color="inherit"
                            onClick={openMenu}
                            sx={{ display: { xs: 'flex', md: 'none' }, marginLeft: 0 }}
                        >
                            <Hamburger />
                        </IconButton>
                    </Stack>

                </StyledToolbar>
            </AppBar>
        </>
    );
}

export default MainAppBar;