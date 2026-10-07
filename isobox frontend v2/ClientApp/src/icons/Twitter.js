import * as React from 'react';
import SvgIcon from '@mui/material/SvgIcon';

function Twitter({color, fontSize, ...props}) {
    return (
        <SvgIcon viewBox={"0 0 40 40"} color={color} fontSize={fontSize} {...props}>
            <path className="st0" d="M30,13.8c-0.7,0.3-1.5,0.5-2.4,0.6c0.9-0.5,1.5-1.3,1.8-2.3c-0.8,0.5-1.7,0.8-2.6,1c-1.6-1.7-4.2-1.7-5.8-0.2
	c-1.1,1-1.5,2.5-1.2,3.9c-3.3-0.2-6.4-1.7-8.5-4.3c-1.1,1.9-0.5,4.3,1.3,5.5c-0.7,0-1.3-0.2-1.9-0.5v0.1c0,2,1.4,3.6,3.3,4
	c-0.4,0.1-0.7,0.1-1.1,0.1c-0.3,0-0.5,0-0.8-0.1c0.5,1.7,2.1,2.8,3.8,2.8c-1.5,1.1-3.3,1.8-5.1,1.8c-0.3,0-0.7,0-1-0.1
	c5.4,3.5,12.6,1.9,16.1-3.5c1.2-1.9,1.8-4.1,1.8-6.3c0-0.2,0-0.4,0-0.5C28.8,15.3,29.5,14.6,30,13.8z"/>
        </SvgIcon>
    );
}

export default Twitter;