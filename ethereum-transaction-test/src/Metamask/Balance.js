import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Stack, Typography} from "@mui/material";
import {ethers} from 'ethers';
import erc20abi from  "../abi/erc20ABI.json";

const Balance = (props, ref) => {
    const mEth = window.ethereum;
    const {contractAddress} = props;

    const [balance, setBalance] = useState(null);

    const getMyBalance = async () => {
        const provider = new ethers.providers.Web3Provider(mEth);
        await provider.send("eth_requestAccounts", []);

        const erc20 = new ethers.Contract(String(contractAddress), erc20abi, provider);
        const signer = await provider.getSigner();
        const signerAddress = await signer.getAddress();
        const balance = await erc20.balanceOf(signerAddress);
        const tokenSymbol = await erc20.symbol();

        setBalance({
            address: signerAddress,
            balance: String(balance),
            tokenSymbol
        })
    }

    const reload = () => {
        setBalance(null);
        getMyBalance();
    }

    useEffect(() => getMyBalance());

    useImperativeHandle(ref,  () => ({reload}), []);

    if (!balance) return <></>
    return (
        <Stack alignItems={"center"}>
            <Typography variant={"subtitle1"}>{balance.balance} Supply</Typography>
            <Typography variant={"subtitle1"}>({balance.balance / (10 ** 18)} {balance.tokenSymbol})</Typography>
        </Stack>
    );
}

export default forwardRef(Balance);