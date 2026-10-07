import * as React from 'react';
import Box from '@mui/material/Box';
import {styled} from "@mui/styles";
import ContactSection from "../ContactSection";

const Root = styled(Box)(({theme}) => ({
    backgroundColor: "#424242",
}));

function MainFooter() {
    return (
        <Root flexGrow={1} py={7}>
            <ContactSection />
        </Root>
    );
}

export default MainFooter;