import {createTheme} from "@mui/material/styles";

export const theme = createTheme({
    palette: {
        mode: "light",
        primary: {
            main: "#F37021",
            light: "#F48F52",
            dark: "#E85C07",
            contrastText: "#fff"
        },
        secondary: {
            main: "#fff",
            light: "#FFF",
            dark: "#FFF",
            contrastText: "#333"
        },
        text: {
            primary: "#1B110B",
            secondary: "#49413C",
            disabled: "#d5d5d5"
        },
    },
    typography: {
        fontFamily: [
            'Noto Sans KR',
            'sans-serif',
        ].join(','),
    },
})