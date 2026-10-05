import React, {useEffect, useState} from "react";
import { SpinePlayer } from '@esotericsoftware/spine-player';
import {Box, FormControl, InputLabel, MenuItem, Select, Stack, Typography} from "@mui/material";

// http://esotericsoftware.com/spine-player#Embedding-a-player

const animations = [
    {key: "jump", hint: "Jump"},
    {key: "walk", hint: "Walk"},
    {key: "run", hint: "Run"},
]

function App() {

    const [animation, setAnimation] = useState("jump");

    const handleChange = (event) => setAnimation(event.target.value);

    const setPlayer = () => {
        new SpinePlayer('player-container', {
            jsonUrl: "http://esotericsoftware.com/files/examples/4.0/spineboy/export/spineboy-pro.json",
            atlasUrl: "http://esotericsoftware.com/files/examples/4.0/spineboy/export/spineboy.atlas",
            animation: animation,
            animations: ["walk", "run", "jump"],
            premultipliedAlpha: true,
            alpha: true,
            // backgroundColor: '#cccccc',
            viewport: {
                debugRender: true,
            },
            showControls: false,
        });
    }

    useEffect(() => setPlayer(), []);

    useEffect(() => {
        document.getElementById("player-container").innerHTML = "";
        setPlayer();
    }, [animation])

  return (
      <Stack p={2} spacing={3}>
          <Typography variant={"h5"}>Spine Player</Typography>

          <FormControl fullWidth>
              <InputLabel id="simple-select-label">Animation</InputLabel>
              <Select
                  labelId="simple-select-label"
                  id="simple-select"
                  value={animation}
                  label="Animation"
                  onChange={handleChange}
              >
                  {animations.map((ani) => <MenuItem value={ani.key}>{ani.hint}</MenuItem>)}
              </Select>
          </FormControl>

          <Box>
              <div id="player-container"></div>
          </Box>
      </Stack>
  );
}

export default App;
