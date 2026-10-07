import * as React from 'react';

import Stack from '@mui/material/Stack';
import {useTheme} from "@mui/styles";
import Box from "@mui/material/Box";
import {Typography, useMediaQuery} from "@mui/material";
import {values} from "../../res/values";

function NFTSection() {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down(values.mobileBreakpoint));

    return (
        <Stack direction={"row"} maxWidth={values.content_max} margin={"0 auto"}>
            {values.nftContents.map((item, index) =>
                <React.Fragment key={index}>
                    <Box flex={322}>
                        <Box
                            bgcolor={"gray"}
                            width={"100%"}
                            mb={1.2}
                            style={{
                                borderRadius: mobile ? "16px" : "32px",
                                backgroundColor: "#eee",
                                paddingTop: "100%",
                                // aspectRatio: "1/1",

                                backgroundImage: `url('${item.image}')`,
                                backgroundPosition: "center",
                                backgroundSize: "cover",

                                "boxShadow": "0 2px 80px 0 rgba(0, 0, 0, 0.14)"
                            }}
                        >
                            {/*<img src={item.image} width={"100%"} height={"100%"} />*/}
                        </Box>

                        <Typography
                            variant={mobile ? "subtitle2" : "h6"}
                            align={"center"}
                            textTransform={"uppercase"}
                            pt={.5}
                        >
                            {item.title}
                        </Typography>
                    </Box>

                    {index < 2 && <Box flex={80}/>}
                </React.Fragment>
            )}
        </Stack>
    );
}

export default NFTSection;