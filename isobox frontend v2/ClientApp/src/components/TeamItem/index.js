import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import {Stack, useMediaQuery} from "@mui/material";
import {values} from "../../res/values";
import {useTheme} from "@mui/styles";

function TeamItem({name, sub, cap, detail, image, active, transitionOn, align, longWidth}) {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down(values.mobileBreakpoint));

    return (
        <Stack
            direction={"column"}
            alignItems={"center"}
            style={transitionOn ? {
                transition: ".3s",
                transform: active ? 'scale(1)' : 'scale(0.7)',
                opacity:  active ? 1 : .6
            } : {}}
            flex={1}
            maxWidth={280}
            margin={"0 auto"}
        >
            <Box
                width={mobile ? 198 : "100%"}
                maxWidth={271}
                height={mobile ? 168 : 230}
                sx={{
                    // aspectRatio: "1/1",
                    borderRadius: 6,
                    // backgroundColor: "#f2f2f4",

                    backgroundImage: `url('${image}')`,
                    backgroundPosition: "center",
                    backgroundSize: "cover",
                }}
                mb={2}
            >
                {/*<Box width={"100%"} height={"100%"}>*/}
                {/*    <img src={item.image} style={{objectFit: "cover", objectPosition: "center"}} />*/}
                {/*</Box>*/}
            </Box>

            <Typography
                variant={"h5"}
                align={"center"}
                textTransform={"capitalize"}
                noWrap
                pb={.5}
                style={{
                    "fontSize": "20px",
                    "fontWeight": "bold",
                    "fontStretch": "normal",
                    "fontStyle": "normal",
                    "lineHeight": "1.4",
                    "letterSpacing": "normal",
                    "color": "#1b110b",
                }}
            >
                {name}
            </Typography>

            {sub &&
                <Typography
                    variant={"subtitle1"}
                    align={"center"}
                    noWrap
                    style={{
                        "fontSize": "16px",
                        "fontWeight": "500",
                        "fontStretch": "normal",
                        "fontStyle": "normal",
                        "lineHeight": "1.63",
                        "letterSpacing": "-0.5px",
                        "color": "#685c55",

                    }}
                    whiteSpace={"pre-line"}
                >
                    {sub}
                </Typography>
            }

            {cap &&
                <Typography
                    variant={"subtitle1"}
                    align={"center"}
                    style={{
                        "fontSize": "14px",
                        "fontWeight": "300",
                        "fontStretch": "normal",
                        "fontStyle": "normal",
                        "lineHeight": "1.71",
                        "letterSpacing": "normal",
                        "color": "#685c55",
                        width: "100%",
                    }}
                    whiteSpace={"pre-line"}
                    pb={1}
                >
                    {cap}
                </Typography>
            }

            <Typography
                // variant={item.small_letters ? "subtitle2" : "subtitle1"}
                variant={"subtitle2"}
                align={align ? align : "center"}
                color={"text.secondary"}
                fontWeight={"normal"}
                whiteSpace={"pre-line"}
                style={{
                    "fontSize": "14px",
                    "fontStretch": "normal",
                    "fontStyle": "normal",
                    "lineHeight": "1.86",
                    "letterSpacing": "-0.9px",
                    "color": "#685c55",
                    width: longWidth ? longWidth : "100%",
                }}
                pt={1}
            >
                {detail}
            </Typography>
        </Stack>
    )
}

export default TeamItem;