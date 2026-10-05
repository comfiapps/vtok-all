import * as React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from "swiper";
import "swiper/css";
import "swiper/css/grid";

import Stack from '@mui/material/Stack';
import {useTheme} from "@mui/styles";
import Box from "@mui/material/Box";
import {Container, Typography, useMediaQuery} from "@mui/material";
import strings from "../../res/strings";
import {values} from "../../res/values";
import {useState} from "react";

import pet1 from "../../assets/web.image_anim_pet1.webp"
import pet2 from "../../assets/web.image_anim_pet2.webp"
import pet3 from "../../assets/web.image_anim_pet3.webp"
import petback1 from "../../assets/web_image_pet1back.png"
import petback2 from "../../assets/web_image_pet2back.png"
import petback3 from "../../assets/web_anim_pet3back.png"
import useWindowDimensions from "../../res/windowSize";

const contents = [
    {
        source: pet1,
        source_backwards: petback1,
        style: {
            "opacity": "0.4",
            "backgroundImage": "linear-gradient(230deg, #fbbb78, #ff9530 100%)"
        }
    },
    {
        source: pet2,
        source_backwards: petback2,
        style: {
            "opacity": "0.5",
            "boxShadow": "0 8px 20px 10px rgba(141, 147, 215, 0.2)",
            "backgroundImage": "linear-gradient(230deg, #8d93d7, #2c37ab 100%)"
        }
    },
    {
        source: pet3,
        source_backwards: petback3,
        style: {
            "opacity": "0.4",
            "backgroundImage": "linear-gradient(230deg, #c7e3de, #5b9186 100%)"
        }
    },

]

function Item({item, focused}) {

    const area = (image, style) => {
        return (
            <Stack
                direction={"row"}
                alignItems={"center"}
                justifyContent={"center"}
                position={"absolute"}
                bottom={0}
                left={0}
                right={0}
                m={1.5}
                zIndex={1}
                style={{
                    transition: "0.1s",
                    transitionTimingFunction: "ease-in-out",
                    ...style
                }}
            >
                <img src={image} width={"100%"} />
            </Stack>
        );
    }

    return (
        <>
            {area(item.source, {opacity: focused ? 1 : 0})}
            {area(item.source_backwards, {opacity: focused ? 0 : 1})}

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
        </>
    )
}

function Item2({item, focused}) {
    return (
        <Box
            width={"100%"}
            height={"100%"}
            style={{
                position: "relative",
                width: "100%",

                transition: ".3s",
                transform: focused ? 'scale(1)' : 'scale(0.7)',
                transformOrigin: "center 80%",
                opacity:  focused ? 1 : .6,

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
                width={"100%"}
                style={{
                    opacity: focused ? 1 : 0,
                    boxSizing: "content-box",
                    transition: "0.1s",
                    transitionTimingFunction: "ease-in-out",
                    position: "absolute",
                    zIndex: 1,
                    bottom: 0,
                }}
            />

            <img
                src={item.source_backwards}
                width={"100%"}
                style={{
                    opacity: focused ? 0 : 1,
                    boxSizing: "content-box",
                    transition: "0.1s",
                    transitionTimingFunction: "ease-in-out",
                    position: "absolute",
                    zIndex: 1,
                    bottom: 0,
                }}
            />
        </Box>
    )
}

function PetBox() {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("md"));
    const mobile = useMediaQuery(theme.breakpoints.down(700));
    const {width, height} = useWindowDimensions();

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Container maxWidth={values.breakpoint} style={{padding: mobile && 0}}>

            <Stack direction={"column"} spacing={4} margin={"0 auto"} width={"100%"} height={"100%"}>

                {mobile ?
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
                        }}
                    >
                        {contents.map((item, index) =>
                            <SwiperSlide
                                style={{
                                    width: width - 120,
                                    maxWidth: 280,
                                    height: 350,
                                    boxSizing: "border-box",
                                }}
                            >
                                <Item2 item={item} focused={activeIndex === index}/>
                            </SwiperSlide>
                        )}
                    </Swiper>
                    :
                    <Stack direction={"row"} spacing={4} px={breakpoint ? 3 : 10}>
                        {contents.map((item, index) =>
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
                                <Item item={item} focused={activeIndex === index}/>
                            </Box>
                        )}
                    </Stack>
                }

                <Typography
                    variant={"subtitle1"}
                    whiteSpace={!breakpoint && "pre-line"}
                    align={"center"}
                    lineHeight={2}
                    fontSize={breakpoint ? "1rem" : "1.125rem"}
                    px={mobile && 2}
                >
                    {strings.pet_description}
                </Typography>

            </Stack>

        </Container>
    );
}

export default PetBox;