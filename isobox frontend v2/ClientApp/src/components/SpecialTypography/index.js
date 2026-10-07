import * as React from 'react';
import {useTheme} from "@mui/styles";
import {Typography} from "@mui/material";

function SpecialTypography({children, subStyle, ...props}) {
    const theme = useTheme();

    function convert(s) {
        const content = String(s);
        // const regex = /<e>.*<\/e>/g
        // const inner = /[^<e><\/e>]+/g;
        // const inner = /<.+?>/g;

        // const inner = /<e>|<\/e>/g;
        const inner = /<e>.*?<\/e>/g;

        const plainText = content.split(inner);
        const array = content.match(inner);
        if (s.startsWith("<e>")) array.unshift("");

        if (!plainText) return <React.Fragment></React.Fragment>
        return (
            <React.Fragment>
                {plainText.map((item, index) =>
                    <React.Fragment key={index}>
                        <React.Fragment>{item}</React.Fragment>
                        {array &&
                            <span style={subStyle ? {...subStyle} : {}}>
                                {array[index] && array[index].replace("<e>", "").replace("</e>", "")}
                            </span>
                        }
                    </React.Fragment>
                )}
            </React.Fragment>
        );
    }

    return (
        <Typography
            {...props}
        >
            {children && convert(children)}
        </Typography>
    );
}

export default SpecialTypography;