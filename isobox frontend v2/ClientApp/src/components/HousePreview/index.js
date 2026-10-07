import * as React from 'react';
import Box from '@mui/material/Box';
import {styled, useTheme} from "@mui/styles";

import house from "../../assets/house_a_bg.png"
import bubble from "../../assets/house_a_bubble.png"
import pet from "../../assets/normal_pet.webp"
import stand1 from "../../assets/nft1.gif"
import stand2 from "../../assets/nft2.gif"

const Root = styled(Box)({
    boxSizing: "border-box",
    width: "100%",
    height: "auto",
    position: "relative",
    userSelect: "none",
    msUserSelect: "none",
});

function HousePreview(props) {
    const theme = useTheme();
    // const bgref = useRef();

/*
    useEffect(() => {
        if (bgref) {
            const width = bgref.current.clientWidth;
            const height = bgref.current.clientHeight;

            console.log(width, height)
        }
    }, [bgref.current]);
*/

    return (
        <Root>
            <img
                src={house}
                // ref={bgref}
                width={"100%"}
                style={{
                    objectFit: "contain",
                    objectPosition: "center",
                    zIndex: "1",
                }}
            />

            <img
                src={stand1}
                width={"12.1%"}
                style={{
                    left: "34.7%",
                    top: "44.5%",
                    position: "absolute",
                    zIndex: "2",
                }}
            />

            <img
                src={stand2}
                width={"12.1%"}
                style={{
                    left: "21.3%",
                    top: "51%",
                    position: "absolute",
                    zIndex: "2",
                }}
            />

            <img
                src={pet}
                width={"21.1%"}
                style={{
                    left: "36.1%",
                    top: "51.1%",
                    position: "absolute",
                    zIndex: "3",
                }}
            />

            <img
                src={bubble}
                width={"28%"}
                style={{
                    left: "32.1%",
                    top: "45.6%",
                    position: "absolute",
                    zIndex: "4",
                }}
            />

        </Root>
    );
}

export default HousePreview;