import * as React from 'react';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import strings from "../../res/strings";
import {Stack, useMediaQuery} from "@mui/material";
import {styled, useTheme} from "@mui/styles";
import {useEffect, useState} from "react";
import {apiRequest} from "../../api/request";
import {getMintingData} from "../../api/apiRequests";

import hand from "../../assets/web.image_hand.png"
import avatar from "../../assets/web.image_anim.house.avatar.gif"
import house from "../../assets/web.image_house.png"
import sofa from "../../assets/web.image_house_sofa.png"
import avatar1 from "../../assets/web.image_anim_sm_avatar1.webp"
import avatar2 from "../../assets/web.image_anim_sm_avatar2.webp"
import stand1 from "../../assets/web.image_anim_deco1.webp"
import stand2 from "../../assets/web.image_anim_deco2.webp"

const Root = styled(Box)({
    width: 664,
    height: 930,
    position: "relative",
});

function HousePreview(props) {

    return (
        <Root>
            <img
                src={avatar}
                width={317}
                height={748}
                style={{
                    position: "absolute",
                    right: 0,
                    top: 0,
                }}
            />

            <img
                src={house}
                width={"100%"}
                style={{
                    position: "absolute",
                    right: 0,
                    left: 0,
                    bottom: 0,
                    aspectRatio: "1/1",
                }}
            />

            <img
                src={hand}
                width={65}
                height={42}
                style={{
                    position: "absolute",
                    right: 90,
                    bottom: 535,
                }}
            />

            <img
                src={stand1}
                width={105}
                height={237}
                style={{
                    position: "absolute",
                    left: 145,
                    bottom: 153,
                }}
            />

            <img
                src={stand2}
                width={105}
                height={237}
                style={{
                    position: "absolute",
                    left: 251,
                    bottom: 209,
                }}
            />

            <img
                src={avatar1}
                width={95}
                height={206}
                style={{
                    position: "absolute",
                    bottom: 220,
                    right: 222,
                }}
            />

            <img
                src={sofa}
                width={169}
                height={126}
                style={{
                    position: "absolute",
                    bottom: 131,
                    right: 156,
                }}
            />

            <img
                src={avatar2}
                width={95}
                height={206}
                style={{
                    position: "absolute",
                    left: 241,
                    bottom: 117,
                    WebkitTransform: "scaleX(-1)",
                    transfrom: "scaleX(-1)"
                }}
            />

        </Root>
    );
}

export default HousePreview;