import {useEffect, useState} from "react";
import {Stack, Typography} from "@mui/material";
import {ethers} from 'ethers';
import erc20abi from  "../abi/erc20ABI.json";

const Info = ({contractAddress}) => {
    const mEth = window.ethereum;

    const [contract, setContract] = useState(null);

    const getTokenInfo = async () => {
        const provider = new ethers.providers.Web3Provider(mEth);
        const erc20 = new ethers.Contract(String(contractAddress), erc20abi, provider);

        const tokenName = await erc20.name();
        const tokenSymbol = await erc20.symbol();
        const totalSupply = await erc20.totalSupply();
        const decimals = await erc20.decimals();

        setContract({
            tokenName,
            tokenSymbol,
            totalSupply: String(totalSupply),
            decimals
        });
    }

    useEffect(() => getTokenInfo(), []);

    if (!contract) return <></>
    return (
        <>
            <Stack alignItems={"center"}>
                <Typography variant={"h6"} fontWeight={"bold"} gutterBottom>Name</Typography>
                <Typography variant={"subtitle1"}>{contract.tokenName}</Typography>
            </Stack>

            <Stack alignItems={"center"}>
                <Typography variant={"h6"} fontWeight={"bold"} gutterBottom>TotalSupply</Typography>
                <Typography variant={"subtitle1"}>{contract.totalSupply}</Typography>
                <Typography variant={"subtitle1"}>({contract.totalSupply / (10 ** contract.decimals)} {contract.tokenSymbol})</Typography>
            </Stack>
        </>
    );
}

export default Info;