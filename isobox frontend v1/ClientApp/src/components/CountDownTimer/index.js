import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import strings from "../../res/strings";
import {Stack, useMediaQuery} from "@mui/material";
import {styled, useTheme} from "@mui/styles";
import {useEffect, useState} from "react";
import {apiRequest} from "../../api/request";
import {getMintingData} from "../../api/apiRequests";

const Root = styled(Stack)(({theme}) => ({
    width: "100%",
    maxWidth: "490px",
    padding: "42px 32px",
    boxSizing: "border-box",
    "borderRadius": "24px",
    "backgroundColor": "#fafafa"
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
    "borderRadius": "20px",
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

function CountDownTimer(props) {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("md"));

    const [due, setDue] = useState(null);
    const [now, setNow] = useState(null);
    const [left, setLeft] = useState({days: 0, hours: 0, minutes: 0, seconds: 0});

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


    return (
        <Root direction={"column"} spacing={4} onClick={props.toggle}>

            <Typography
                variant={"h4"}
                fontWeight={500}
                lineHeight={1.4}
                align={"center"}
            >
                TEXT
            </Typography>

            <Stack direction={"column"} spacing={2}>
                <Typography variant={"h6"} textTransform={"uppercase"} fontWeight={300}>
                    {strings.comming_soon}
                </Typography>

                <Stack direction={"row"} spacing={2}>
                    {timerContent.map((item, index) =>
                        <SmallBlock key={index}>
                            <Typography
                                variant={"h5"}
                                fontWeight={700}
                                color={item.alert && Number(left.hours) < 1 && "primary"}
                            >
                                {String(item.primary).padStart(2, '0')}
                            </Typography>
                            <Typography
                                textTransform={"uppercase"}
                                color={item.alert && Number(left.hours) < 1 && "primary"}
                            >
                                {item.secondary}
                            </Typography>
                        </SmallBlock>
                    )}
                </Stack>
            </Stack>

            <Stack direction={"column"} spacing={2}>
                <Typography variant={"h6"} textTransform={"uppercase"} fontWeight={300}>
                    {strings.total_funding}
                </Typography>

                <LargeBlock>
                    <Typography variant={"h5"} fontWeight={700}>120,558,510</Typography>
                    <Typography textTransform={"uppercase"}>each</Typography>
                </LargeBlock>
            </Stack>

        </Root>
    );
}

export default CountDownTimer;