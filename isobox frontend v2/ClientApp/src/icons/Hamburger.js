import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

function Hamburger({color, fontSize, ...props}) {
    return (
        <SvgIcon viewBox={"0 0 24 24"} color={color} fontSize={fontSize} {...props}>
            <g>
                <rect x="3" y="5" width="18" height="2" rx="1"/>
                <rect x="3" y="11" width="18" height="2" rx="1"/>
                <rect x="9" y="17" width="12" height="2" rx="1"/>
            </g>
        </SvgIcon>
    );
}

export default Hamburger;