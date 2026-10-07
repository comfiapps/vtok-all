import * as React from 'react';
import Typography from '@mui/material/Typography';
import strings from "../../res/strings";
import {Box, Stack, useMediaQuery} from "@mui/material";
import {styled, useTheme} from "@mui/styles";
import {useEffect, useState} from "react";
import {apiRequest} from "../../api/request";
import {getMintingData} from "../../api/apiRequests";
import {values} from "../../res/values";

import check from "../../assets/icon_check.svg";

const Root = styled(Stack)(({theme}) => ({
    maxWidth: 480,
    width: "100%",
    paddingTop: "40px 32px",
    boxSizing: "border-box",
    "borderRadius": "24px",
    "backgroundColor": "white",
    "border": "solid 1px #ddd",
    msUserSelect: "none",
    userSelect: "none"
}));

const SmallBlock = styled((props) => (
    <Stack
        {...props}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        py={1}
    />
))(({ theme }) => ({
    flex: 1,
    height: "100%",
    "borderRadius": "8px",
    "border": "solid 1px #ddd",
    "backgroundColor": "#f5f6f7"
}));

const LargeBlock = styled((props) => (
    <Stack
        {...props}
        direction={"column"}
        alignItems={"center"}
        justifyContent={"center"}
        py={1}
        TabIndicatorProps={{ children: <span className="MuiTabs-indicatorSpan" /> }}
    />
))(({ theme }) => ({
    width: "100%",
    "padding": 12,
    "borderRadius": "20px",
    boxSizing: "border-box",
    "backgroundColor": "#f5f6f7"
}));

function CountDownTimer({account, ...props}) {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("md"));
    const mobile = useMediaQuery(theme.breakpoints.down(values.mobileBreakpoint));

    const [due, setDue] = useState(null);
    const [now, setNow] = useState(null);
    const [left, setLeft] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});
    const [status, setStatus] = useState(-1);

    const timerContent = [
        { primary: left.days, secondary: strings.day },
        { primary: left.hours, secondary: strings.hour },
        { primary: left.minutes, secondary: strings.min, alert: true },
        { primary: left.seconds, secondary: strings.sec, alert: true },
    ]

    const calculateTimeLeft = () => {
        if (due && now) {
            const difference = due - now;

            // if (difference > 0) {
                setLeft({
                    days: Math.floor(difference / (60 * 60 * 24)),
                    hours: Math.floor((difference / (60 * 60)) % 24),
                    minutes: Math.floor((difference / 60) % 60),
                    seconds: Math.floor((difference) % 60)
                })
            // } else {
                // props.toggle();
            // }
        }
    }

    useEffect(() => {
        getMintingData(
            (success) => {
                setNow(success.nowdate);
                setDue(success.startdate);
            }
        );
    }, []);

    useEffect(() => calculateTimeLeft(), [now]);

    useEffect(() => {
        const timeout = setInterval(() => setNow(now => now + 1), 1000);
        return () => clearInterval(timeout);
    }, [due]);

    useEffect(() => {
        if (!account) setStatus(2);

    }, [account]);

    const subTitleProps = {
        variant: "caption",
        style: {
            opacity: .5
        }
    }

    return (
        <Root
            direction={"column"}
            spacing={4}
            onClick={props.toggle}
        >
            <Typography
                pt={5}
                variant={"h5"}
                lineHeight={1.4}
                align={"center"}
                fontWeight={500}
            >
                {strings.minting_ready}
            </Typography>

            <Stack direction={"column"} spacing={1} px={"5%"}>
                {/*<Typography {...subTitleProps}>*/}
                {/*    {strings.time_left}*/}
                {/*</Typography>*/}

                <Stack direction={"row"} spacing={"6%"}>
                    {timerContent.map((item, index) =>
                        <SmallBlock key={index}>
                            <Typography
                                variant={"h5"}
                                fontWeight={700}
                                // color={item.alert && Number(left.hours) < 1 && "primary"}
                            >
                                {String(item.primary).padStart(2, '0')}
                            </Typography>
                            <Typography
                                variant={"caption"}
                                textTransform={"uppercase"}
                                // color={item.alert && Number(left.hours) < 1 && "primary"}
                                style={{opacity: .3}}
                            >
                                {item.secondary}
                            </Typography>
                        </SmallBlock>
                    )}
                </Stack>
            </Stack>

            <Stack direction={"column"} pt={"6%"}>

                <Stack
                    alignItems={"center"}
                    style={{
                        "height": "22px",
                        "borderTop": "solid 1px #ddd",
                        "borderBottom": "solid 1px #ddd",
                        "backgroundColor": "#f5f6f7"
                    }}
                >
                    <Typography {...subTitleProps}>
                        {strings.my_status}
                    </Typography>
                </Stack>

                <Stack direction={"row"}>
                    {values.myStatus.map((item, index) =>
                        <Stack
                            key={index}
                            direction={"row"}
                            spacing={.6}
                            flex={1}
                            alignItems={"center"}
                            justifyContent={"center"}
                            minHeight={"56px"}
                            py={1}
                            px={2}
                            style={{
                                borderRight: index !== values.myStatus.length - 1 && "solid 1px #ddd",
                                backgroundColor: index !== status && "#fafafa",
                            }}
                        >

                            <Typography
                                align={"center"}
                                style={{
                                    "fontSize": "0.875rem",
                                    "fontWeight": "500",
                                    "fontStretch": "normal",
                                    "fontStyle": "normal",
                                    "lineHeight": "normal",
                                    "letterSpacing": "normal",
                                    "color": index !== status ? "#ddd" : theme.palette.primary.main,
                                }}
                            >
                                {item}
                            </Typography>
                        </Stack>
                    )}
                </Stack>

                <Stack
                    alignItems={"center"}
                    style={{
                        "height": "22px",
                        "borderTop": "solid 1px #ddd",
                        "borderBottom": "solid 1px #ddd",
                        "backgroundColor": "#f5f6f7"
                    }}
                >
                    <Typography {...subTitleProps}>
                        {strings.minting_quantity}
                    </Typography>
                </Stack>


                <Stack
                    height={"56px"}
                    alignItems={"center"}
                    justifyContent={"center"}
                    style={{
                        borderBottom: "solid 1px #ddd",
                    }}
                >
                    <Typography variant={"h6"}>
                        13,500
                    </Typography>
                </Stack>

                <Box
                    height={48}
                    bgcolor={"#f5f6f7"}
                    style={{
                        borderBottomRightRadius: "24px",
                        borderBottomLeftRadius: "24px",
                    }}
                />

            </Stack>

        </Root>
    );
}

export default CountDownTimer;