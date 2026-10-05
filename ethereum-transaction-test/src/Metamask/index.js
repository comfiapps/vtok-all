import {useEffect, useRef, useState} from "react";
import {Stack, Typography} from "@mui/material";
import {ethers} from "ethers";
import BasicTabs from "../Component/Tabs";
import ERC20 from "./ERC20";
import NFT from "./ERC721";
import {useHistory, useLocation, useSearchParams} from "react-router-dom";

const tabs = [
    {title: "Coin", layout: <ERC20 />},
    {title: "NFT", layout: <NFT />}
]

function Metamask() {
    const mEth = window.ethereum;
    const ref = useRef();

    const [currentTab, setCurrentTab] = useState(Number(new URL(window.location).searchParams.get("page")));

    const [account, setAccount] = useState(null);
    const [error, setError] = useState(null);
    const [balance, setBalance] = useState(null);

    const connect = () => {
        if (mEth) mEth.request({method: 'eth_requestAccounts'}).then(result => setAccount(result[0]));
        else setError("Install MetamaskIcon");
    }

    const getUserBalance = (address) => {
        mEth.request({method: 'eth_getBalance', params: [address, 'latest']})
            .then(balance => setBalance(ethers.utils.formatEther(balance)));
    }

    if (mEth) {
        mEth.on('accountsChanged', acc => setAccount(acc));
        mEth.on('chainChanged', () => window.location.reload()); // on network change
    }

    useEffect(() => {
        if (!account) setBalance(null);
        else {
            getUserBalance(account.toString());
            if (ref.current) ref.current.reload();
        }
    }, [account]);

    useEffect(() => connect(), [mEth]);

    useEffect(() => {
        const url = new URL(window.location);
        url.searchParams.set("page", currentTab);
        window.history.pushState({}, '', url);
    }, [currentTab]);

    return (
        <Stack alignItems={"center"}>
            <Stack
                width={"100%"}
                maxWidth={650}
                px={3}
                py={8}
                boxSizing={"border-box"}
                alignItems={"center"}
                spacing={4}
            >

                <Typography variant={"h2"}>Metamask</Typography>
                <Typography variant={"subtitle1"} color={"error"} fontWeight={"bold"}>{error}</Typography>

                <Stack alignItems={"center"}>
                    <Typography variant={"h6"} fontWeight={"bold"} gutterBottom>Address</Typography>
                    <Typography variant={"h6"}>{!!account ? account : "-"}</Typography>
                </Stack>

                <Stack alignItems={"center"}>
                    <Typography variant={"h6"} fontWeight={"bold"} gutterBottom>Balance</Typography>
                    <Typography variant={"h6"}>{!!balance ? balance : "-"} Ethers</Typography>
                </Stack>

                <BasicTabs tabs={tabs} value={currentTab} setValue={setCurrentTab}/>

                {tabs.map((tab, index) =>
                    <div hidden={currentTab !== index} style={{width: "100%"}}>
                        {tab.layout}
                    </div>
                )}

            </Stack>
        </Stack>
    );
}

export default Metamask;