import {Stack, Toolbar, Typography} from "@mui/material";
import SearchBar from "../component/SearchBar";
import * as React from "react";
import IconButton from "@mui/material/IconButton";
import {ArrowBack} from "@mui/icons-material";

const CategoryPage = ({title, subtitle, hasSearch = true, backClick, ...props}) => {
    return (
        <Toolbar
            sx={{
                my: 2.5,
                "&.MuiToolbar-root": {
                    p: 0
                }
            }}
        >
            {Boolean(backClick) && <IconButton onClick={backClick}><ArrowBack/></IconButton>}

            <Stack direction={"row"} spacing={2} flexGrow={1}>
                {Boolean(backClick) && <span/>}
                <Typography variant={"h3"} component="div" noWrap>{Boolean(title) ? title : "제목 없음"}</Typography>
                {Boolean(subtitle) && <Typography pt={2} variant={"h6"} noWrap>{subtitle}</Typography>}
            </Stack>

            {hasSearch && <SearchBar {...props}/>}
        </Toolbar>
    );
}

export default CategoryPage;
