import {useEffect, useState} from "react";
import {Stack, Typography} from "@mui/material";
import {ethers} from 'ethers';
import erc20abi from  "../abi/erc20ABI.json";

function Transaction({contractAddress}) {
    const mEth = window.ethereum;

    const [txs, setTxs] = useState([]);

    useEffect(() => {
        const provider = new ethers.providers.Web3Provider(mEth);
        const erc20 = new ethers.Contract(String(contractAddress), erc20abi, provider);
        erc20.on("Transfer", (from, to, amount, event) => {
            setTxs(currentTxs => [
                {
                    txHash: event.transactionHash,
                    from,
                    to,
                    amount: String(amount)
                },
                ...currentTxs
            ]);
        });
        return () => erc20.removeAllListeners();
    }, [contractAddress]);

    return (
        <>
            {txs.map((item, index) =>
                <Stack
                    direction={"column"}
                    spacing={0.5}
                    bgcolor={"rgba(0,247,255,0.23)"}
                    borderRadius={4}
                    p={2}
                >
                    <Typography noWrap>From: {item.from}</Typography>
                    <Typography noWrap>To: {item.to}</Typography>
                    <Typography noWrap>Amount: {item.amount}</Typography>
                    <Typography noWrap>Tx: {item.txHash}</Typography>
                </Stack>
            )}
        </>
    );
}

export default Transaction;