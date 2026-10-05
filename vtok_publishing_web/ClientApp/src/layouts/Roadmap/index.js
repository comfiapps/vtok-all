import * as React from 'react';

import {styled, useTheme, withStyles} from "@mui/styles";
import {Typography, Stack} from "@mui/material";

import Timeline from '@mui/lab/Timeline';
import TimelineSeparator from '@mui/lab/TimelineSeparator';
import TimelineConnector from '@mui/lab/TimelineConnector';
import TimelineContent from '@mui/lab/TimelineContent';
import TimelineDot from '@mui/lab/TimelineDot';
import Accordion from '@mui/material/Accordion';
import AccordionDetails from '@mui/material/AccordionDetails';
import AccordionSummary from '@mui/material/AccordionSummary';
import ExpandMoreIcon from '@mui/icons-material/ExpandMore';
import strings from "../../res/strings";
import {TimelineItem as MuiTimelineItem} from "@mui/lab";
import {values} from "../../res/values";

const Root = styled('div')(({theme}) => ({
    maxWidth: 700,
    margin: "0 auto",
    // "margin": "40px 0 0",
    paddingBottom: "4px",
    paddingLeft: "10px",
    borderRadius: 8,
    boxSizing: "border-box",
    backgroundColor: "#2a2a2a"
}));

const TimelineItem = withStyles({
    missingOppositeContent: {
        "&:before": {
            display: "none"
        }
    }
})(MuiTimelineItem);

function RoadmapSection() {
    const theme = useTheme();

    const [expanded, setExpanded] = React.useState(0);

    const handleChange = (panel) => (event, isExpanded) => setExpanded(isExpanded ? panel : false);

    return (
        <Root>

            <Timeline sx={{width: "100%", boxSizing: "border-box"}}>
                {values.roadmapContents.map((value, index, array) =>
                    <TimelineItem key={index}>
                        <TimelineSeparator>
                            <TimelineDot
                                color={value.isColored && "primary"}
                                style={{
                                    width: 24,
                                    height: 24,
                                    boxSizing: "border-box",
                                    display: "flex",
                                    justifyContent: "center",
                                    alignItems: "center",
                                    backgroundColor: !value.isColored && "#666"
                                }}
                            >
                                {value.icon}
                            </TimelineDot>
                            <TimelineConnector />
                        </TimelineSeparator>
                        <TimelineContent>
                            <Accordion
                                expanded={expanded === index}
                                onChange={handleChange(index)}
                                style={{
                                    backgroundColor: "transparent",
                                    color: "white"
                                }}
                                elevation={0}
                            >
                                <AccordionSummary
                                    expandIcon={<ExpandMoreIcon color={"secondary"} />}
                                    sx={{
                                        paddingX: 1,
                                        height: 2
                                    }}
                                >
                                    <Stack direction={"column"}>
                                        <Typography variant={"subtitle1"} lineHeight={1.2} fontWeight={"bold"}>{value.title}</Typography>
                                        <Typography variant={"caption"}>{value.date}</Typography>
                                    </Stack>
                                </AccordionSummary>
                                <AccordionDetails>
                                    <Typography variant={"subtitle2"} sx={{opacity: .8}}>
                                        {value.description}
                                    </Typography>
                                </AccordionDetails>
                            </Accordion>

                        </TimelineContent>
                    </TimelineItem>
                )}
            </Timeline>

        </Root>
    );
}

export default RoadmapSection;