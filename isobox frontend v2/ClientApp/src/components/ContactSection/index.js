import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import strings from "../../res/strings";
import {Grid, Stack, useMediaQuery} from "@mui/material";
import {useTheme} from "@mui/styles";
import {values} from "../../res/values";
import SocialMediaButtonGroup from "../SocialMediaButtonGroup";

function ContactSection({tiny, color}) {
    const theme = useTheme();
    const breakpoint = useMediaQuery(theme.breakpoints.down(700));
    const mobile = useMediaQuery(theme.breakpoints.down(values.mobileBreakpoint));

    return (
        <Box maxWidth={values.content_max} px={5} margin={"0 auto"}>
            <Stack direction={(tiny || breakpoint) ? "column-reverse" : "row"} spacing={4}>

                {!tiny &&
                    <Grid container rowSpacing={1} columnSpacing={(tiny || breakpoint) ? 0 : 3} maxWidth={430} style={{opacity: .5}} margin={"0 auto"}>
                        <Grid item xs={12} md={6}>
                            <Typography variant={"subtitle2"} color={"primary.contrastText"} align={(tiny || breakpoint) ? "center" : "left"}>
                                {strings.company_info}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant={"subtitle2"} color={"primary.contrastText"} align={(tiny || breakpoint) ? "center" : "left"}>
                                {strings.company_number}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant={"subtitle2"} color={"primary.contrastText"} align={(tiny || breakpoint) ? "center" : "left"}>
                                {strings.contact_info}
                            </Typography>
                        </Grid>

                        <Grid item xs={12} md={6}>
                            <Typography variant={"subtitle2"} color={"primary.contrastText"} align={(tiny || breakpoint) ? "center" : "left"}>
                                {strings.partnership_info}
                            </Typography>
                        </Grid>
                    </Grid>
                }

                {!(tiny || breakpoint) && <Box flexGrow={1} />}

                <Stack direction={"column"} spacing={2} alignItems={"center"}>
                    <Typography variant={"subtitle2"} color={"primary.contrastText"} textTransform={"uppercase"}>
                        {strings.follow_us}
                    </Typography>

                    <SocialMediaButtonGroup color={color} />
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
                style={{opacity: .3}}
            >
                {strings.copyright}
            </Typography>
        </Box>
    );
}

export default ContactSection;