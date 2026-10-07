import * as React from 'react';
import strings from "../../res/strings";
import {Stack} from "@mui/material";
import {useTheme} from "@mui/styles";
import Discord from "../../icons/Discord";
import Kakao from "../../icons/Kakao";
import Telegram from "../../icons/Telegram";
import Twitter from "../../icons/Twitter";

function SocialMediaButtonGroup({color = "#49413c"}) {
    const theme = useTheme();

    const iconProps = {
        style: {
            fontSize: 42,
            color: color,
        }
    }

    const socialMedia = [
        {
            icon: <Discord {...iconProps} />,
            url: "https://discord.gg/P4VaHQqucS"
        },
        {
            icon: <Twitter {...iconProps} />,
            url: "https://twitter.com/iSOBOX_official",
        },
        {
            icon: <Telegram {...iconProps} />,
            url: "https://t.me/isobox_official",
        },
        {
            icon: <Kakao {...iconProps} />,
            url: "https://open.kakao.com/o/gktS0V1d",
        },
    ];

    return (
        <Stack
            direction={"row"}
            spacing={3}
        >
            {socialMedia.map((item, index) =>
                <Stack
                    key={index}
                    alignItems={"center"}
                    justifyContent={"center"}
                    style={{
                        "width": "40px",
                        "height": "40px",
                        "borderRadius": "8px",
                        "backgroundColor": "#fafafa",
                        cursor: "pointer"
                    }}
                    onClick={() => window.open(item.url, '_blank')}
                >
                    {item.icon}
                </Stack>
            )}
        </Stack>
    );
}

export default SocialMediaButtonGroup;