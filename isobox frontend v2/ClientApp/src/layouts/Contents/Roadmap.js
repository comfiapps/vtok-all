import * as React from 'react';

import {styled, useTheme, withStyles} from "@mui/styles";
import {Typography, Stack, Box, useMediaQuery} from "@mui/material";

import Timeline from '@mui/lab/Timeline';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import {TimelineItem as MuiTimelineItem} from "@mui/lab";
import {values} from "../../res/values";

const TimelineItem = withStyles({
    missingOppositeContent: {
        "&:before": {
            display: "none"
        }
    }
})(MuiTimelineItem);

const shiftLength = 15;

function RoadmapSection() {
    const theme = useTheme();
    const mobile = useMediaQuery(theme.breakpoints.down(values.mobileBreakpoint));

    return (
        <Box
            style={{
                maxWidth: 968,
                borderRadius: 20,
                backgroundColor: "#f1f2f3",
                margin: "0 auto",
                // paddingLeft: "10px",
                boxSizing: "border-box",
            }}
            px={"2%"}
            py={.1}
        >

            <Timeline sx={{width: "100%", boxSizing: "border-box"}}>
                {values.roadmapContents.map((value, index, array) =>
                    <TimelineItem key={index}>
                        <TimelineSeparator>
                            <TimelineDot
                                color={value.isColored && "primary"}
                                style={{
                                    marginTop: shiftLength,
                                    width: 24,
                                    height: 24,
                                    boxSizing: "border-box",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: !value.isColored && "#d1cfce",
                                    boxShadow: "none"
                                }}
                            >
                                {value.icon}
                            </TimelineDot>
                            <TimelineConnector
                                style={index === values.roadmapContents.length - 1 ? {
                                    marginTop: -10,
                                    borderRadius: 16,
                                    width: index === values.roadmapContents.length - 1 && 0
                                } : {
                                    marginTop: -10,
                                    marginBottom: -shiftLength,
                                    backgroundColor: value.isColored ? theme.palette.primary.main : "#d1cfce",
                                    borderRadius: 16,
                                    width: index === values.roadmapContents.length - 1 && 0
                                }}
                            />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Accordion
                                defaultExpanded={index < 1}
                                style={{
                                    backgroundColor: "transparent",
                                    color: "49413c"
                                }}
                                elevation={0}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon color={"black"} />}
                                    sx={{
                                        paddingX: 1,
                                        height: 2
                                    }}
                                >
                                    <Stack direction={"column"}>
                                        <Typography
                                            variant={"body1"}
                                            lineHeight={1.44}
                                            fontWeight={500}
                                            color={"#49413c"}
                                            style={mobile ? {
                                                "fontSize": "1rem",
                                            } : {
                                                "fontSize": "1.125rem",
                                                "letterSpacing": "1px",
                                            }}
                                        >
                                            {value.title}
                                        </Typography>

                                        <Typography
                                            variant={"subtitle2"}
                                            style={{
                                                fontWeight: "normal",
                                                "color": "#a4a09d"
                                            }}
                                        >
                                            {value.date}
                                        </Typography>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography
                                        variant={"body1"}
                                        sx={{opacity: .8}}
                                        whiteSpace={"pre-line"}
                                        color={"#49413c"}
                                        ml={-1}
                                        style={mobile ? {
                                            "lineHeight": "1.8",
                                            fontSize: "0.9rem",
                                            wordBreak: "break-word"
                                        } : {
                                            "fontSize": "1rem",
                                            "fontWeight": "normal",
                                            "fontStretch": "normal",
                                            "fontStyle": "normal",
                                            "lineHeight": "2",
                                            "letterSpacing": "normal",
                                            "color": "#49413c",
                                            wordBreak: "break-word"
                                        }}
                                    >
                                        {value.description}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                        </TimelineContent>
                    </TimelineItem>
                )}
            </Timeline>

        </Box>
    );
}

export default RoadmapSection;