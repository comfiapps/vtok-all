import {useEffect, useState} from "react";
import {
    Button,
    FilledInput,
    FormControl,
    InputAdornment,
    InputLabel,
    MenuItem,
    Select,
    TextField
} from "@mui/material";
import {ethers} from 'ethers';
import erc20abi from  "../abi/erc20ABI.json";
import {DefaultAddress} from "../Constant/ethereum";

function Transfer({contractAddress}) {
    const mEth = window.ethereum;

    const [recipient, setRecipient] = useState("");
    const [amount, setAmount] = useState(0);
    const [symbol, setSymbol] = useState("");

    const handleRecipient = e => setRecipient(e.target.value);

    const handleTransfer = async () => {
        const provider = new ethers.providers.Web3Provider(mEth);
        await provider.send("eth_requestAccounts", []);

        const signer = await provider.getSigner();
        const erc20 = new ethers.Contract(contractAddress, erc20abi, signer);

        await erc20.transfer(recipient, (amount * (10 ** 18)).toString());
    }

    const getTokenSymbol = async () => {
        const provider = new ethers.providers.Web3Provider(mEth);
        const erc20 = new ethers.Contract(String(contractAddress), erc20abi, provider);
        const tokenSymbol = await erc20.symbol();
        setSymbol(tokenSymbol);
    }

    useEffect(() => getTokenSymbol(), [contractAddress]);

    return (
        <>
            <FormControl fullWidth>
                <InputLabel id="transfer-metamask-simple-select-label">Default Recipient</InputLabel>
                <Select
                    labelId="transfer-metamask-simple-select-label"
                    label="Default Recipient"
                    onChange={handleRecipient}
                    value={recipient}
                >
                    {DefaultAddress.map(address => <MenuItem value={address.address}>{address.address}</MenuItem>)}
                </Select>
            </FormControl>

            <TextField
                variant={"filled"}
                label={"Recipient Address"}
                fullWidth
                onChange={handleRecipient}
                value={recipient}
            />

            <FilledInput
                label={"Amount"}
                type={"number"}
                value={amount}
                onChange={e => setAmount(e.target.value)}
                endAdornment={<InputAdornment position="end">{symbol}</InputAdornment>}
            />

            <Button variant={"outlined"} onClick={handleTransfer}>
                Transfer
            </Button>
        </>
    );
}

export default Transfer;