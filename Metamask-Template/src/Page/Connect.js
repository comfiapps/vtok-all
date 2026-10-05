import {useState} from "react";
import {Box, Button, Stack, Typography} from "@mui/material";
import {ethers} from 'ethers';

function Connect() {
    const mEth = window.ethereum;

    const [error, setError] = useState(null);
    const [account, setAccount] = useState(null);
    const [balance, setBalance] = useState(null);

    const connect = () => {
        if (mEth) mEth.request({method: 'eth_requestAccounts'}).then(result => handleChange(result[0]));
        else setError("Install Metamask");
    }

    const handleChange = (newAccount) => {
        setAccount(newAccount);
        getUserBalance(newAccount.toString());
    }

    const getUserBalance = (address) => {
        mEth.request({method: 'eth_getBalance', params: [address, 'latest']})
            .then(balance => setBalance(ethers.utils.formatEther(balance)));
    }

    if (mEth) {
        mEth.on('accountsChanged', handleChange);
        mEth.on('chainChanged', () => window.location.reload()); // on network change
    }

    return (
        <Stack alignItems={"center"}>
            <Stack maxWidth={700} px={3} py={8} alignItems={"center"} spacing={3}>
                <Typography variant={"h2"} gutterBottom>Connect Metamask</Typography>
                <Typography variant={"subtitle1"}>{error}</Typography>

                <Stack alignItems={"center"}>
                    <Typography variant={"h6"} fontWeight={"bold"} gutterBottom>Address</Typography>
                    <Typography variant={"h6"}>{Boolean(account) ? account : "-"}</Typography>
                </Stack>

                <Stack alignItems={"center"}>
                    <Typography variant={"h6"} fontWeight={"bold"} gutterBottom>Balance</Typography>
                    <Typography variant={"h6"}>{Boolean(balance) ? balance : "-"} Ethers</Typography>
                </Stack>

                <Button variant={"contained"} onClick={connect} fullWidth>
                    Connect
                </Button>

            </Stack>
        </Stack>
    );
}

export default Connect;
