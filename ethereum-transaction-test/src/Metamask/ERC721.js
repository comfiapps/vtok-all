import {forwardRef, useEffect, useImperativeHandle, useState} from "react";
import {Stack, Typography} from "@mui/material";
import {ethers} from 'ethers';

// https://bestofreactjs.com/repo/dabit3-full-stack-ethereum-marketplace-workshop-react-react-apps
const ERC721 = () => {
    const mEth = window.ethereum;

    const [nfts, setNfts] = useState([]);
    const [loaded, setLoaded] = useState(null);

    const load = async () => {
        const provider = new ethers.providers.Web3Provider(mEth);
        await provider.send("eth_requestAccounts", []);


    }

/*    const load = async () => {
        const provider = new ethers.providers.JsonRpcProvider()
        const tokenContract = new ethers.Contract(nftaddress, NFT.abi, provider)
        const marketContract = new ethers.Contract(nftmarketaddress, Market.abi, provider)
        const data = await marketContract.fetchMarketItems()

        const items = await Promise.all(data.map(async i => {
            const tokenUri = await tokenContract.tokenURI(i.tokenId)
            const meta = await axios.get(tokenUri)
            let price = web3.utils.fromWei(i.price.toString(), 'ether');
            let item = {
                price,
                tokenId: i.tokenId.toNumber(),
                seller: i.seller,
                owner: i.owner,
                image: meta.data.image,
            }
            return item
        }))
        setNfts(items)
        setLoaded('loaded')
    }*/

    return (
        <></>
    );
}

export default ERC721;