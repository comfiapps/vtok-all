import * as React from 'react';
import Stack from '@mui/material/Stack';
import {Box, Button, Container, Typography, useMediaQuery} from "@mui/material";
import strings from "../../res/strings";
import {styled, useTheme} from "@mui/styles";
import MintBox from "../../components/MintBox";
import {values} from "../../res/values";
import CountDownTimer from "../../components/CountDownTimer";
import HousePreview from "../../components/HousePreview";
import {useState, useRef, useEffect} from "react";
import useWindowDimensions from "../../res/windowSize"

import isobox from "../../assets/web_image.isobox.png"
import sentence from "../../assets/web_image.sentence.png"
import {getMintingStatus} from "../../api/apiRequests";

const Root = styled(Stack)({
    boxSizing: "border-box",
    overflow: "hidden",
});

const houseOriginWidth = 664;
const minScale = 0.7;

function Home(props) {
    const theme = useTheme();
    const { width } = useWindowDimensions();
    const ref = useRef();

    const minHouseSizeCal = houseOriginWidth * minScale + 24;

    const breakpoint = useMediaQuery(theme.breakpoints.down('md'));
    const verticalBreakpoint = useMediaQuery(theme.breakpoints.down(700));
    const houseBreakpoint = useMediaQuery(theme.breakpoints.down(minHouseSizeCal));

    const [mode, setMode] = useState(0);
    const [scale, setScale] = useState(0.8);

    useEffect(() => {
        getMintingStatus(
            (success) => {
                switch (success) {
                    case "Wait": setMode(1); break;
                    case "Start": setMode(0); break;
                    default: setMode(-1);
                }
            }
        );
    }, []);

    useEffect(() => {
        if (ref && ref.current) {
            const divWidth = ref.current.clientWidth;
            const cal = (divWidth * 0.7 / houseOriginWidth) - 0.2;

            if (houseBreakpoint) setScale((width - 30) / houseOriginWidth);
            else if (cal < minScale) setScale(minScale);
            else if (cal > 1) setScale(1);
            else setScale(cal);
        }
    }, [width]);

    return (
        <Container
            maxWidth={values.breakpoint}
            style={{position: "relative", overflow: "hidden", boxSizing: "border-box"}}
            ref={ref}
        >

            <Stack direction={"row"} width={"100%"}>

                <Box flexGrow={1}/>

                <Box
                    mt={verticalBreakpoint && "120px"}
                    pt={houseBreakpoint && "240px"}
                    style={{
                        transform: `scale(${scale})`,
                        transformOrigin: houseBreakpoint ? "top right" : "right",
                    }}
                    ml={`-${minHouseSizeCal}px`}
                >
                    <HousePreview />
                </Box>

                <Root
                    id={"home"}
                    direction={"row"}
                    width={"100%"}
                    position={"absolute"}
                    py={17}
                >
                    <Box flex={breakpoint ? .1 : .5} />

                    <Stack
                        direction={"column"}
                        spacing={3}
                        flex={3}
                        maxWidth={breakpoint ? 400 : "100%"}
                    >
                        <img src={isobox} width={"100%"} style={{maxWidth: 630}}/>
                        <img src={sentence} width={"100%"} style={{maxWidth: 600}}/>
                        <Box minHeight={32} />

                        {/*{mode === 0 && <MintBox toggle={() => setMode(1)} {...props}/>}*/}
                        {/*{mode === 1 && <CountDownTimer toggle={() => setMode(0)} />}*/}
                    </Stack>

                    <Box flex={breakpoint ? 1 : 3} />
                </Root>
            </Stack>
        </Container>
    );
}

export default Home;