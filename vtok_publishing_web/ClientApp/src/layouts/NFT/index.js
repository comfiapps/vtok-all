import * as React from 'react';

import Stack from '@mui/material/Stack';
import {useTheme} from "@mui/styles";
import Box from "@mui/material/Box";
import {Typography, useMediaQuery} from "@mui/material";
import {values} from "../../res/values";

function NFTSection() {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down(600));

    return (
        <Stack direction={"row"}>
            {values.nftContents.map((item, index) =>
                <>
                    <Box key={index} flex={26.7}>
                        <Box
                            bgcolor={"gray"}
                            width={"100%"}
                            mb={1.2}
                            style={{
                                borderRadius: "16px",
                                backgroundColor: "#eee",
                                paddingTop: "100%",
                                // aspectRatio: "1/1",

                                backgroundImage: `url('${item.image}')`,
                                backgroundPosition: "center",
                                backgroundSize: "cover"
                            }}
                        >
                            {/*<img src={item.image} width={"100%"} height={"100%"} />*/}
                        </Box>

                        <Typography
                            variant={breakpoint ? "subtitle2" : "h6"}
                            align={"center"}
                            textTransform={"uppercase"}
                        >
                            {item.title}
                        </Typography>
                    </Box>

                    {index < 2 && <Box flex={2.7}/>}
                </>
            )}
        </Stack>
    );
}

export default NFTSection;