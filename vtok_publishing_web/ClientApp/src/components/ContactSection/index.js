import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import strings from "../../res/strings";
import {Button, Container, Stack, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/styles";
import {values} from "../../res/values";

function ContactSection() {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down("md"));

    return (
        <Container maxWidth={values.breakpoint}>
            <Stack direction={breakpoint ? "column" : "row"} spacing={5}>

                <Stack direction={"row"} spacing={4} alignItems={"center"} justifyContent={"center"}>
                    <Button color={"secondary"} size={breakpoint ? "small" : "large"} disableRipple>
                        {strings.whitepaper}
                    </Button>

                    <Button color={"secondary"} size={breakpoint ? "small" : "large"} disableRipple>
                        {strings.contact_us}
                    </Button>
                </Stack>

                {!breakpoint && <Box flexGrow={1} />}

                <Stack direction={"column"} spacing={2} alignItems={"center"}>
                    <Typography variant={"subtitle2"} color={"primary.contrastText"} textTransform={"uppercase"}>
                        {strings.social_media}
                    </Typography>

                    <Stack direction={"row"} spacing={4}>
                        <Box width={"40px"} height={"40px"} bgcolor={"white"}>

                        </Box>

                        <Box width={"40px"} height={"40px"} bgcolor={"white"}>

                        </Box>

                        <Box width={"40px"} height={"40px"} bgcolor={"white"}>

                        </Box>
                    </Stack>
                </Stack>
            </Stack>

            <Typography
                variant={"overline"}
                color={theme.palette.primary.contrastText}
                align={"center"}
                width={"100%"}
                margin={"0 auto"}
                textTransform={"none"}
                component={'div'}
                mt={6}
            >
                @2022 iSOBOX from VTOK
            </Typography>
        </Container>
    );
}

export default ContactSection;