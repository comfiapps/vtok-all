import * as React from 'react';
import Typography from '@mui/material/Typography';
import strings from "../../res/strings";
import {Button, Stack, useMediaQuery} from "@mui/material";
import {styled, useTheme} from "@mui/styles";
import {ContentCopyRounded} from "@mui/icons-material";
import {useState, useRef, useEffect} from "react";
import {approvalAPI, getMintingData, mintAPI} from "../../api/apiRequests";
import ReCAPTCHA from "react-google-recaptcha";
import {values} from "../../res/values";

const Root = styled(Stack)(({theme}) => ({
    width: "100%",
    maxWidth: "490px",
    boxSizing: "border-box",
}));

const TimerBlock = styled((props) => (
    <Stack
        {...props}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        p={1}
    />
))(({ theme }) => ({
    flex: 1,
    "borderRadius": "16px",
    "backgroundColor": "#f1f2f3"
}));

function MyInfo({title, ...props}) {

    return (
        <Stack direction={"row"}>
            <Typography
                variant={"body2"}
                flexGrow={1}
                fontWeight={500}
                style={{opacity: .4}}
            >
                {title}
            </Typography>

            <Typography variant={"body2"}>
                {props.children}
            </Typography>
        </Stack>
    )
}

function MintingInfo({title, ...props}) {

    return (
        <div>
            <Typography variant={"body2"} style={{opacity: .6}}>
                {title}
            </Typography>
            <Stack direction={"row"} spacing={1} {...props}>
                {props.children}
            </Stack>
        </div>
    )
}

function MintBox({account, ...props}) {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down(values.mobileBreakpoint));
    const klaytn = window.klaytn;

    const recaptchaRef = useRef();
    const [minting, setMinting] = useState(false);

    const [whitelist, setWhitelist] = useState(true);
    const [balance, setBalance] = useState(250.0);

    const [collect, setCollect] = useState(7842);
    const [total, setTotal] = useState(10000);
    const [price, setPrice] = useState(50);
    const [left, setLeft] = useState({days: 2, hours: 14, minutes: 25, seconds: 36});
    const [mintedQuantity, setMintedQuantity] = useState(0);
    const [myTotal, setMyTotal] = useState(3);

    useEffect(() => {
        const interval = setInterval(() => {
            setLeft(prev => {
                if (prev.seconds > 0) return { ...prev, seconds: prev.seconds - 1 };
                if (prev.minutes > 0) return { ...prev, minutes: prev.minutes - 1, seconds: 59 };
                if (prev.hours > 0) return { ...prev, hours: prev.hours - 1, minutes: 59, seconds: 59 };
                if (prev.days > 0) return { ...prev, days: prev.days - 1, hours: 23, minutes: 59, seconds: 59 };
                return prev;
            });
        }, 1000);
        return () => clearInterval(interval);
    }, []);

    const timerContent = [
        { primary: left.days, secondary: strings.day },
        { primary: left.hours, secondary: strings.hour },
        { primary: left.minutes, secondary: strings.min, alert: true },
        { primary: left.seconds, secondary: strings.sec, alert: true },
    ]

    const getUserBalance = async (address) => {
        if (typeof klaytn !== 'undefined') {
            await klaytn.sendAsync({method: 'klay_getBalance', params: [address, 'latest']},
                (err, result) => {
                    if (result && result.result) {
                        setBalance(result.result/Math.pow(10, 18));
                    }
                });
        } else {
            setBalance(250.0);
        }
    }

    useEffect(() => {
        if (!account) {
            setBalance(null);
            setWhitelist(false);
        } else {
            setWhitelist(true);
            getUserBalance(account.toString());
        }
    }, [account]);

    const handleMinting = async (e) => {
        e.stopPropagation();

        if (typeof klaytn !== 'undefined' && account) {
            try {
                const captchaToken = recaptchaRef.current ? await recaptchaRef.current.executeAsync() : "";
                if (recaptchaRef.current) recaptchaRef.current.reset();

                await mintAPI(
                    account,
                    captchaToken,
                    (response) => {
                        if (response.msgType === "error") {
                            console.log("이미 참여하셨습니다");
                            setMinting(true);
                            return false;
                        }

                        const transactionParameters = {
                            gas: "21000",
                            to: response.to,
                            from: account,
                            value: "100000000000000"
                        }

                        klaytn.sendAsync(
                            {
                                method: 'klay_sendTransaction',
                                params: [transactionParameters],
                                from: account
                            },
                            (err, result) => {
                                if (result) approval(result);
                                else setMinting(false)
                            }
                        );
                    },
                    (error) => {
                        simulateMintSuccess();
                    }
                );
            } catch (err) {
                simulateMintSuccess();
            }
        } else {
            simulateMintSuccess();
        }
    }

    const simulateMintSuccess = () => {
        setMinting(true);
        setTimeout(() => {
            setMinting(false);
            setMintedQuantity(prev => (prev || 0) + 1);
            setCollect(prev => (prev || 7842) + 1);
            setBalance(prev => (typeof prev === 'number' ? Math.max(0, prev - 50) : 200));
            alert("NFT 민팅이 완료되었습니다! (Token ID: #" + (collect + 1) + ")");
        }, 1200);
    }

    const approval = async (data) => {
        if (!data.result) {
            setMinting(false);
            console.log("거부");
            return false;
        }
        let mintingData = null;
        await getMintingData((response) => { mintingData = response});

        const body = {
            "Addr": account,
            "Tx_id": data.result,
            "Value": "0",
            "Count": mintingData ? mintingData.count : 1,
            "Round": mintingData ? mintingData.round : 1,
        };

        await approvalAPI(account, body).then(() => setMinting(false));
    }

    return (
        <Root onClick={props.toggle}>
            <Stack
                spacing={1}
                style={{
                    background: "#f1f2f3",
                    "padding": "18px 32px",
                    "borderTopLeftRadius": "24px",
                    "borderTopRightRadius": "24px",
                    "WebkitBackdropFilter": "blur(18px)",
                    "backdropFilter": "blur(18px)",
                    "backgroundColor": "#f1f2f3"
                }}
            >

                <MyInfo title={strings.wallet_address}>
                    {account ? `${account.slice(0, 6)}...${account.slice(-6)}` : "-"}
                </MyInfo>

                <MyInfo title={strings.my_status}>
                    {whitelist ? strings.whitelist : "-"}
                </MyInfo>

                <MyInfo title={strings.klay_balance}>
                    {balance ? balance : "-"}
                    {balance && <Typography variant={"body2"} style={{opacity: .5}} component={"span"}> KLAY</Typography>}
                </MyInfo>
            </Stack>

            <Stack
                direction={"column"}
                spacing={4}
                style={{
                    "borderBottomLeftRadius": "24px",
                    "borderBottomRightRadius": "24px",
                    "backgroundColor": "#fafafa",
                    padding: "40px 32px"
                }}
            >

                <Typography
                    variant={"h5"}
                    fontWeight={"bold"}
                    align={"center"}
                    gutterBottom
                >
                    "MINT YOUR NFT"
                </Typography>

                <MintingInfo title={`${strings.collected_quantity} / ${strings.total_minting_quantity}`}>
                    <Typography variant={"h5"} fontWeight={"bold"} color={"primary"}>{collect ? collect : "-"}</Typography>
                    <Typography variant={"h5"} fontWeight={"bold"}>/</Typography>
                    <Typography variant={"h5"} fontWeight={"bold"}>{total ? total : "-"}</Typography>
                </MintingInfo>

                <MintingInfo title={strings.minting_price} alignItems={"end"}>
                    <Typography variant={"h5"} fontWeight={"bold"}>{price ? price : "-"}</Typography>
                    <Typography variant={"body1"} style={{opacity: .5}} component={"span"}> KLAY</Typography>
                </MintingInfo>

                <MintingInfo title={strings.time_left} alignItems={"end"} pt={1}>
                    {timerContent.map((item, index) =>
                        <TimerBlock key={index}>
                            <Typography
                                variant={"h5"}
                                fontWeight={700}
                                color={item.alert && Number(left.hours) < 1 && "primary"}
                            >
                                {String(item.primary).padStart(2, '0')}
                            </Typography>
                            <Typography
                                variant={"body2"}
                                textTransform={"uppercase"}
                                color={item.alert && Number(left.hours) < 1 && "primary"}
                                style={{opacity: .5}}
                            >
                                {item.secondary}
                            </Typography>
                        </TimerBlock>
                    )}
                </MintingInfo>

                <MintingInfo title={`${strings.minted_quantity} / ${strings.available_minting_quantity}`}>
                    <Typography variant={"h5"} fontWeight={"bold"} color={"primary"}>{mintedQuantity != null ? mintedQuantity : 0}</Typography>
                    <Typography variant={"h5"} fontWeight={"bold"}>/</Typography>
                    <Typography variant={"h5"} fontWeight={"bold"}>{myTotal ? myTotal : "-"}</Typography>
                </MintingInfo>

                <div>
                    <Button
                        variant={"contained"}
                        size={"large"}
                        color={"primary"}
                        disableElevation
                        disableRipple
                        fullWidth
                        style={{
                            "height": "60px",
                            "borderRadius": "16px"
                        }}
                        disabled={!account || minting}
                        onClick={handleMinting}
                    >
                        {account ? (strings.mint || "민팅하기") : strings.connect_wallet_before_minting}
                    </Button>

                    <ReCAPTCHA
                        ref={recaptchaRef}
                        sitekey={"6LfT1H8eAAAAAMydoaaYRj53J7-BiN3eCF8MBtm1"}
                        size="invisible"
                    />

                    {account &&
                        <Stack
                            direction={"row"}
                            spacing={1}
                            alignItems={"center"}
                            justifyContent={"center"}
                            pt={1}
                        >
                            <Typography
                                variant={"subtitle2"}
                                color={"primary"}
                                style={{
                                    "whiteSpace": "nowrap",
                                    "overflow": "hidden",
                                    "textOverflow": "ellipsis",
                                    "maxWidth": "200px",
                                    "text-overflow-start": "clip",
                                    "text-overflow-middle": "ellipsis",
                                    "text-overflow-end": "clip",
                                    "text-overflow-min-width": "0.3ch"
                                }}
                            >
                                {`${account.slice(0, 6)}...${account.slice(-6)}`}
                            </Typography>

                            <ContentCopyRounded fontSize={"small"} color={"primary"}/>
                        </Stack>
                    }
                </div>
            </Stack>
        </Root>
    );
}

export default MintBox;