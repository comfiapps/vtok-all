import {useState} from "react";
import {Typography} from "@mui/material";

function Change() {
    const ethereum = window.ethereum;

    const [address, setAddress] = useState(null);

    if (ethereum) {
        ethereum.on('accountsChanged', (accounts) => {
            setAddress(accounts[0]);
        })
    }

    return (
        <div>
            <Typography variant={"h6"}>Your ethereum address: {address}</Typography>
        </div>
    );
}

export default Change;
