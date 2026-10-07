import * as React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from "swiper";
import "swiper/css";
import "swiper/css/grid";

import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import {LinearProgress, Typography, useMediaQuery} from "@mui/material";
import {useState} from "react";
import Arrow from "../../icons/Arrow";
import {useTheme} from "@mui/styles";
import {values} from "../../res/values";

function Item({item, active, transitionOn}) {
    return (
        <Stack
            direction={"column"}
            alignItems={"center"}
            style={transitionOn ? {
                transition: ".3s",
                transform: active ? 'scale(1)' : 'scale(0.7)',
                opacity:  active ? 1 : .6
            } : {}}
        >
            <Box
                width={170}
                height={170}
                sx={{
                    // aspectRatio: "1/1",
                    borderRadius: 6,
                    backgroundColor: "#f2f2f4",

                    backgroundImage: `url('${item.image}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover"
                }}
                mb={1.5}
            >
                {/*<Box width={"100%"} height={"100%"}>*/}
                {/*    <img src={item.image} style={{objectFit: "cover", objectPosition: "center"}} />*/}
                {/*</Box>*/}
            </Box>

            <Typography
                variant={"h5"}
                align={"center"}
                fontWeight={"bold"}
                textTransform={"capitalize"}
                noWrap
            >
                {item.name}
            </Typography>

            <Typography variant={"subtitle1"} align={"center"} gutterBottom noWrap>{item.sub}</Typography>

            <Typography
                variant={item.small_letters ? "subtitle2" : "subtitle1"}
                align={"center"}
                color={"text.secondary"}
                fontWeight={"normal"}
            >
                {item.detail}
            </Typography>
        </Stack>
    )
}

let timeout;

function TeamSection() {
    const theme = useTheme();
    const tablet = useMediaQuery(theme.breakpoints.down("md"));
    const mobile = useMediaQuery(theme.breakpoints.down(600));

    const [swiper, setSwiper] = useState(null);
    const [progress, setProgress] = useState(0);

    const spaceBetweenSlide = mobile ? 0 : 20;
    const slideRows = mobile ? 1 : 2;

    const handleLeft = () => {
        if (swiper.isBeginning) swiper.slideTo(99);
        else {
            const currentSlide = swiper.activeIndex;

            if (mobile) swiper.slideTo(currentSlide - 1);
            else {
                const width = swiper.width;
                const snapGrid = swiper.snapGrid;

                const offset = snapGrid[currentSlide];
                const destOffset = offset - width;
                let destIndex = 0;

                for (let i = currentSlide; i >= 0; i--) {
                    if (Number(destOffset) >= Number(snapGrid[i])) {
                        destIndex = i;
                        break;
                    }
                }

                swiper.slideTo(destIndex);
            }
        }
    }

    const handleRight = () => {
        if (swiper.isEnd) swiper.slideTo(0);
        else {
            const currentSlide = swiper.activeIndex;

            if (mobile) swiper.slideTo(currentSlide + 1);
            else {
                const width = swiper.width;
                const snapGrid = swiper.snapGrid;

                const offset = snapGrid[currentSlide];
                const destOffset = offset + width;
                let destIndex = snapGrid.length;

                for (let i = currentSlide; i < snapGrid.length; i++) {
                    if (Number(destOffset) <= Number(snapGrid[i])) {
                        destIndex = i;
                        break;
                    }
                }

                swiper.slideTo(destIndex);
            }
        }
    }

    return (
        <Stack
            height={mobile ? 400 : 750}
            direction={"column"}
            spacing={2}
            mt={3}
            sx={{userSelect: "none", msUserSelect: "none"}}
        >
            <Swiper
                onInit={(ev) => setSwiper(ev)}
                spaceBetween={spaceBetweenSlide}
                slidesPerView={tablet ? 2 : mobile ? 1 : 4}
                centeredSlides={mobile && true}
                onSliderMove={swiper => {
                    timeout = setTimeout(() => setProgress(swiper.progress), 100);
                    return () => clearTimeout(timeout);
                }}
                onSlideChange={swiper => {
                    timeout = setTimeout(() => setProgress(swiper.progress), 100);
                    return () => clearTimeout(timeout);
                }}

                modules={[Grid]}
                grid={{
                    rows: slideRows,
                }}
                style={{
                    width: mobile ? "calc(100% + 32px)" : "100%",
                    height: "100%",
                    marginRight: mobile && -16,
                    marginLeft: mobile && -16,
                }}
            >
                {values.teamContents.map((item, index) =>
                    <SwiperSlide
                        key={index}
                        style={{
                            paddingRight: 24,
                            paddingLeft: 24,
                            boxSizing: "border-box",
                            height: `calc((100% - ${slideRows * spaceBetweenSlide}px) / ${slideRows})`
                        }}
                    >
                        <Item
                            item={item}
                            active={swiper ? swiper.activeIndex === index : false}
                            transitionOn={mobile}
                        />
                    </SwiperSlide>
                )}
            </Swiper>

            <Stack
                direction={"row"}
                spacing={2}
                alignItems={"center"}
                px={2}
            >
                <Box onClick={handleLeft} >
                    <Arrow style={{width: 44, height: 44, cursor: "pointer", transform: 'rotate(180deg)'}} />
                </Box>

                <Box flexGrow={1}>
                    <LinearProgress
                        variant="determinate"
                        value={progress * 100}
                        sx={{
                            maxWidth: 300,
                            margin: "0 auto"
                        }}
                    />
                </Box>

                <Box onClick={handleRight} >
                    <Arrow style={{width: 44, height: 44, cursor: "pointer"}} />
                </Box>
            </Stack>
        </Stack>
    );
}

export default TeamSection;