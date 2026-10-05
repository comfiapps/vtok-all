import * as React from 'react';
import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import IconButton from '@mui/material/IconButton';
import MetamaskIcon from "../Icon/MetamaskIcon";
import TrustWalletIcon from "../Icon/TrustWalletIcon";

export default function TopBar() {
    const buttonProp = {
        size: "large",
        color: "inherit"
    }

    return (
        <Box sx={{ flexGrow: 1 }}>
            <AppBar position="static" color={"transparent"} style={{boxShadow: "none"}}>
                <Toolbar>
                    <Box sx={{ flexGrow: 1 }} />
                    <Box>
                        <IconButton {...buttonProp} href={"/metamask"}>
                            <MetamaskIcon />
                        </IconButton>
                        <IconButton {...buttonProp} href={"/trust-wallet"}>
                            <TrustWalletIcon />
                        </IconButton>
                    </Box>
                </Toolbar>
            </AppBar>
        </Box>
    );
}
