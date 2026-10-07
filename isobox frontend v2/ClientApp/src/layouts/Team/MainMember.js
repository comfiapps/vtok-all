import * as React from 'react';

import { Swiper, SwiperSlide } from 'swiper/react';
import { Grid } from "swiper";
import "swiper/css";
import "swiper/css/grid";

import Stack from '@mui/material/Stack';
import Box from "@mui/material/Box";
import {LinearProgress, useMediaQuery} from "@mui/material";
import {useState} from "react";
import Arrow from "../../icons/Arrow";
import {useTheme} from "@mui/styles";
import {values} from "../../res/values";
import TeamItem from "../../components/TeamItem";

let timeout;

function TeamSection() {
    const theme = useTheme();
    const tablet = useMediaQuery(theme.breakpoints.down(1060));
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

    const columnPerPage = tablet ? 2 : mobile ? 1 : 4;
    const correctOrder = () => {
        const content = values.teamContents;
        let finalContent = [];

        const itemPerPage = mobile ? 1 : columnPerPage * slideRows;
        if (itemPerPage <= 1) return content;

        for (let i = 0; i < Math.ceil(content.length / itemPerPage); i++) {
            const current = content.slice(i * itemPerPage, (i + 1) * itemPerPage);
            const half = current.length / 2;

            const first = current.slice(0, half);
            const second = current.slice(half);

            for (let k = 0; k < first.length; k++) {
                finalContent.push(first[k]);
                finalContent.push(second[k]);
            }
        }

        return finalContent;
    }

    return (
        <Stack
            height={mobile ? 360 : 840}
            direction={"column"}
            spacing={2}
            mt={3}
            sx={{userSelect: "none", msUserSelect: "none"}}
            boxSizing={"border-box"}
        >
            <Swiper
                onInit={(ev) => setSwiper(ev)}
                spaceBetween={spaceBetweenSlide}
                slidesPerView={columnPerPage}
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
                    width: "100%",
                    height: "100%",
                    boxSizing: "border-box"
                }}
            >
                {correctOrder().map((item, index) =>
                    <SwiperSlide
                        key={index}
                        style={{
                            // paddingRight: 24,
                            // paddingLeft: 24,
                            boxSizing: "border-box",
                            height: `calc((100% - ${slideRows * spaceBetweenSlide}px) / ${slideRows})`
                        }}
                    >
                        <TeamItem
                            item={item}
                            image={item.image}
                            name={item.name}
                            sub={item.sub}
                            detail={item.detail}
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
                boxSizing={"border-box"}
                maxWidth={values.content_max}
                alignSelf={"center"}
                width={"100%"}
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
                            margin: "0 auto",
                            borderRadius: 16
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