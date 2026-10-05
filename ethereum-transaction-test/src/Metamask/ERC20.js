import {useEffect, useRef, useState} from "react";
import {
    Accordion,
    AccordionDetails,
    AccordionSummary,
    Stack,
    TextField,
    Typography
} from "@mui/material";
import Transfer from "./Transfer";
import Info from "./Info";
import {ExpandMoreRounded} from "@mui/icons-material";
import {ethers} from "ethers";
import Balance from "./Balance";
import Transaction from "./Transaction";

function ERC20() {
    const ref = useRef();

    const [show, setShow] = useState(false);
    const [contract, setContract] = useState("0x821848f05AD89c0264e7f99a6a4baae29a9a2786");

    const commonProp = {
        contractAddress: contract,
    }

    const content = [
        {title: "My Balance", layout: <Balance ref={ref} {...commonProp} />, noClose: true},
        {title: "Token Info", layout: <Info {...commonProp} />},
        {title: "Transfer", layout: <Transfer {...commonProp} />},
        {title: "Recent Transaction", layout: <Transaction {...commonProp} />, noClose: true},
    ]

    useEffect(() => {
        if (ethers.utils.isAddress(contract)) setShow(true);
        else setShow(false);
    }, [contract]);

    return (
        <Stack width={"100%"}>
            <TextField
                variant={"filled"}
                label={"Contract Address"}
                fullWidth
                onChange={e => setContract(e.target.value)}
                value={contract}
            />

            {!!show ?
                content.map(item =>
                    <Accordion width={"100%"} expanded={item.noClose}>
                        <AccordionSummary expandIcon={!item.noClose && <ExpandMoreRounded/>}>
                            <Typography>{item.title}</Typography>
                        </AccordionSummary>
                        <AccordionDetails>
                            <Stack
                                direction={"column"}
                                spacing={3}
                                p={2}
                                boxSizing={"border-box"}
                            >
                                {item.layout}
                            </Stack>
                        </AccordionDetails>
                    </Accordion>
                )
                :
                <Typography color={"error"}>Incorrect Contract Address</Typography>
            }
        </Stack>
    );
}

export default ERC20;