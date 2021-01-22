import { createMuiTheme } from "@material-ui/core";

// colors
const primary = "#b3294e";
const seconday = "#4829B2";
const black = "#343a40";
const darkBlack = "rgb(36, 40, 44)";
const background = "#f5f5f5";

// spacing
const spacing = 8;

const theme = createMuiTheme({
    palette: {
        primary: { main : primary },
        secondary: { main: seconday },
        common: {
            black,
            darkBlack
        },
        tonalOffset: 0.2,
        background: {
            default: background
        },
        spacing
    },
});

export default theme;