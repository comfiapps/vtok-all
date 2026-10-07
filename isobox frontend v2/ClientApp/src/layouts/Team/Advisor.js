import * as React from 'react';

import {values} from "../../res/values";
import TeamItem from "../../components/TeamItem";
import {Grid} from "@mui/material";

function Advisor() {

    return (
        <Grid
            container
            spacing={2}
            rowSpacing={4}
            boxSizing={"border-box"}
            px={2}
        >
            {values.advisorContents.map((item, index) =>
                <Grid item key={index} xs={12} sm={6} md={3}>
                    <TeamItem
                        image={item.image}
                        name={item.name}
                        sub={item.sub}
                        cap={item.cap}
                        detail={item.detail}
                        // active={swiper ? swiper.activeIndex === index : false}
                        // transitionOn={mobile}
                        align={"center"}
                        longWidth={item.longWidth}
                    />
                </Grid>
            )}
        </Grid>
    );
}

export default Advisor;