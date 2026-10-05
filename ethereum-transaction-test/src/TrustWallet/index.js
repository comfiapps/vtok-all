import {useEffect, useState} from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import {ethers} from 'ethers';

function TrustWallet({account, setAccount}) {
    const mEth = window.ethereum;

    const [error, setError] = useState(null);
    const [balance, setBalance] = useState(null);

    const connect = () => {
        if (mEth) mEth.request({method: 'eth_requestAccounts'}).then(result => handleChange(result[0]));
        else setError("Install MetamaskIcon");
    }

    const handleChange = (newAccount) => setAccount(newAccount);

    const getUserBalance = (address) => {
        mEth.request({method: 'eth_getBalance', params: [address, 'latest']})
            .then(balance => setBalance(ethers.utils.formatEther(balance)));
    }

    if (mEth) {
        mEth.on('accountsChanged', handleChange);
        mEth.on('chainChanged', () => window.location.reload()); // on network change
    }

    useEffect(() => connect, []);

    useEffect(() => {
        if (!account) setBalance(null);
        else getUserBalance(account.toString());
    }, [account]);

    return (
        <Stack alignItems={"center"}>
            <Stack width={"100%"} maxWidth={650} px={3} py={8} alignItems={"center"} spacing={3}>
                <Typography variant={"h2"} gutterBottom>Trust Wallet</Typography>
                <Typography variant={"subtitle1"}>{error}</Typography>

                <Stack alignItems={"center"}>
                    <Typography variant={"h6"} fontWeight={"bold"} gutterBottom>Address</Typography>
                    <Typography variant={"h6"}>{!!account ? account : "-"}</Typography>
                </Stack>

                <Stack alignItems={"center"}>
                    <Typography variant={"h6"} fontWeight={"bold"} gutterBottom>Balance</Typography>
                    <Typography variant={"h6"}>{!!balance ? balance : "-"} Ethers</Typography>
                </Stack>

                <Button variant={"contained"} onClick={connect} fullWidth>
                    Connect
                </Button>

            </Stack>
        </Stack>
    );
}

export default TrustWallet;