import * as React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from "swiper";
import "swiper/css";
import "swiper/css/grid";

import Stack from '@mui/material/Stack';
import {useTheme} from "@mui/styles";
import Box from "@mui/material/Box";
import {useMediaQuery} from "@mui/material";
import strings from "../../res/strings";
import {values} from "../../res/values";
import {useState} from "react";
import useWindowDimensions from "../../res/windowSize";
import SpecialTypography from "../../components/SpecialTypography";

function Item({item, focused, mobileMode}) {

    const commonStyle = {
        boxSizing: "content-box",
        transition: "0.1s",
        transitionTimingFunction: "ease-in-out",
        position: "absolute",
        zIndex: 1,
    }

    return (
        <Box
            width={"100%"}
            height={"100%"}
            style={{
                position: "relative",
                width: "100%",

                transition: ".3s",
                transform: mobileMode && (focused ? 'scale(1)' : 'scale(0.7)'),
                transformOrigin: mobileMode && "center 80%",
                opacity: mobileMode && (focused ? 1 : .6),

                boxSizing: "border-box",
            }}
        >

            <Box
                position={"absolute"}
                bottom={0}
                left={0}
                right={0}
                borderRadius={"32px"}
                sx={{
                    width: "100%",
                    paddingTop: "84%",
                    // aspectRatio: "220/186"
                }}
                style={focused ? {...item.style} : {backgroundColor: "#c2c2c2"}}
            />

            <img
                src={item.source}
                width={item.forwardWidth ? item.forwardWidth : item.width ? item.width : '100%'}
                style={{
                    opacity: focused ? 1 : 0,
                    bottom: item.forwardBottom ? item.forwardBottom : item.bottom ? item.bottom : 0,
                    left: item.forwardLeft ? item.forwardLeft : item.left ? item.left : 0,
                    right: item.forwardRight ? item.forwardRight : item.right ? item.right : 0,
                    ...commonStyle
                }}
            />

            <img
                src={item.source_backwards}
                width={item.backwardWidth ? item.backwardWidth : item.width ? item.width : "116%"}
                style={{
                    opacity: focused ? 0 : 1,
                    bottom: item.backwardBottom ? item.backwardBottom : item.bottom ? item.bottom : 0,
                    left: item.backwardLeft ? item.backwardLeft : item.left ? item.left : 0,
                    right: item.backwardRight ? item.backwardRight : item.right ? item.right : 0,
                    ...commonStyle
                }}
            />
        </Box>
    )
}

function PetBox() {
    const theme = useTheme();
    const swipeActive = useMediaQuery(theme.breakpoints.down(700));
    const mobile = useMediaQuery(theme.breakpoints.down(values.mobileBreakpoint));
    const {width, height} = useWindowDimensions();

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Stack
            direction={"column"}
            spacing={4}
            margin={"0 auto"}
            maxWidth={values.content_max - 300}
            width={"100%"}
            height={"100%"}
        >

            {swipeActive ?
                <Swiper
                    slidesPerView={"auto"}
                    centeredSlides={true}
                    loop={true}
                    onActiveIndexChange={swiper => setActiveIndex(swiper.realIndex)}
                    modules={[Grid]}
                    grid={{rows: 1}}
                    style={{
                        width: "100%",
                        height: "100%",
                        marginTop: "-6%"
                    }}
                >
                    {values.petContents.map((item, index) =>
                        <SwiperSlide
                            key={index}
                            style={{
                                width: width - 120,
                                maxWidth: 280,
                                height: 350,
                                boxSizing: "border-box",
                            }}
                        >
                            <Item
                                item={item}
                                focused={activeIndex === index}
                                mobileMode={true}
                            />
                        </SwiperSlide>
                    )}
                </Swiper>
                :
                <Stack direction={"row"} spacing={4} px={2}>
                    {values.petContents.map((item, index) =>
                        <Box
                            key={index}
                            flex={1}
                            position={"relative"}
                            sx={{
                                paddingTop: "35%",
                                // aspectRatio: "4/5"
                            }}
                            onMouseEnter={() => setActiveIndex(index)}
                        >
                            <Item
                                item={item}
                                focused={activeIndex === index}
                                //focused={true}
                            />
                        </Box>
                    )}
                </Stack>
            }

            
            <SpecialTypography
                variant={"subtitle1"}
                whiteSpace={"pre-line"}
                align={"center"}
                lineHeight={1.9}
                px={2}
                style={mobile ? {
                    "fontSize": "1.125rem",
                    "fontWeight": "300",
                } : {
                    "fontSize": "1.25rem",
                    "fontWeight": "300",
                    "fontStretch": "normal",
                    "fontStyle": "normal",
                    "lineHeight": "1.9",
                    "letterSpacing": "0.25px",
                    "color": "#49413c"
                }}
                subStyle={{
                    "fontWeight": "normal",
                    "color": "#1b110b"
                }}
            >
                {strings.nft_content}
            </SpecialTypography>

        </Stack>
    );
}

export default PetBox;