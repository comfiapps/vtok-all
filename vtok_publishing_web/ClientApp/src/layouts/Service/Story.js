import * as React from 'react';

import Stack from '@mui/material/Stack';
import {styled, useTheme} from "@mui/styles";
import Box from "@mui/material/Box";
import {Container, Typography, useMediaQuery} from "@mui/material";
import strings from "../../res/strings";
import {values} from "../../res/values";
import {useState} from "react";
import { Divider } from '@mui/material';

import pic from "../../assets/web.image_story.png"

const Paragraph = styled((props) => (
    <Typography
        {...props}
        variant={"h6"}
        fontWeight={300}
    />
))(({ theme }) => ({
    "lineHeight": 2,
    "letterSpacing": "-0.5px",
    "color": "#1b110b"
}));

function StoryBox() {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down(850));

    const [activeIndex, setActiveIndex] = useState(0);

    return (
        <Container /*maxWidth={values.breakpoint}*/ style={{maxWidth: 1000}}>

            <Stack
                position={"relative"}
                direction={"column"}
                spacing={5}
            >
                <div>
                    <Stack direction={"row"} spacing={2} alignItems={"center"} pb={.5}>
                        <Typography variant={"subtitle1"} color={"#76706d"} fontWeight={500}>{strings.story}</Typography>
                        <Divider width={60} />
                    </Stack>

                    <Typography
                        variant={"h3"}
                        fontWeight={900}
                        gutterBottom
                    >
                        {strings.story_title}
                    </Typography>
                </div>

                <div>
                    {!breakpoint &&
                        <img
                            src={pic}
                            style={{
                                marginTop: -60,
                                maxWidth: 480,
                                float: "right",
                                transform: "scale(1.1)",
                                transformOrigin: "right bottom",

                            }}
                        />
                    }

                    <Paragraph pb={6}>
                        <span style={{fontWeight: 500, wordBreak: "break-all"}}>
                            {strings.story_subtitle}
                        </span>
{/*
                        <Typography variant={"h5"} fontWeight={500} gutterBottom>
                            {strings.story_subtitle}
                        </Typography>
*/}
                        {strings.story_content1}
                    </Paragraph>

                    <Paragraph pb={6}>{strings.story_content2}</Paragraph>

                    {!breakpoint && <Paragraph>{strings.story_content3}</Paragraph>}
                </div>

                {breakpoint && <img src={pic} width={"100%"} style={{maxWidth: 400, margin: "0 auto", transform: "scale(1.2)",}}/>}

                {breakpoint && <Paragraph>{strings.story_content3}</Paragraph>}
            </Stack>

        </Container>
    );
}

export default StoryBox;