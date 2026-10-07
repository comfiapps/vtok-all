import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

function Telegram({color, fontSize, ...props}) {
    return (
        <SvgIcon viewBox={"0 0 40 40"} color={color} fontSize={fontSize} {...props}>
            <path className="cls-1"
                  d="M11.226,18.933l11.913-4.908c1.176-.511,5.165-2.148,5.165-2.148s1.84-.715,1.687,1.023c-.051.716-.46,3.221-.869,5.931l-1.279,8.028s-.1,1.176-.971,1.38-2.3-.716-2.557-.92c-.2-.154-3.834-2.454-5.164-3.579A.97.97,0,0,1,19.2,22.1c1.841-1.687,4.04-3.783,5.369-5.113.614-.613,1.227-2.045-1.329-.306l-7.21,4.857a3.006,3.006,0,0,1-2.352.051c-1.534-.46-3.323-1.074-3.323-1.074s-1.227-.767.869-1.585Z"/>
        </SvgIcon>
    );
}

export default Telegram;