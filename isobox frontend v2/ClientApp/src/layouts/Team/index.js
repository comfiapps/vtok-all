import * as React from 'react';

import Stack from '@mui/material/Stack';
import {Typography} from "@mui/material";
import KeyMember from "./KeyMember";
import MainMember from "./MainMember";
import Advisor from "./Advisor";
import strings from "../../res/strings";

function TeamSection() {

    const titleStyle = {
        "fontSize": "32px",
        "fontWeight": "bold",
        "fontStretch": "normal",
        "fontStyle": "normal",
        "lineHeight": "1.5",
        "letterSpacing": "1px",
        "textAlign": "center",
        "color": "#49413c",
        margin: "16px 0px 40px",
        textTransform: "uppercase"
    }

    return (
        <Stack
            direction={"column"}
            spacing={"12%"}
            mt={5}
            boxSizing={"border-box"}
        >
            <div>
                <Typography style={{...titleStyle}}>
                    {strings.key_member}
                </Typography>
                <KeyMember/>
            </div>

            <div>
                <Typography style={{...titleStyle}}>
                    {strings.main_member}
                </Typography>
                <MainMember />
            </div>


            <div>
                <Typography style={{...titleStyle}}>
                    {strings.advisor}
                </Typography>
                <Advisor />
            </div>

        </Stack>
    );
}

export default TeamSection;