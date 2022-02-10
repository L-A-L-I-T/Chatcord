import { createMuiTheme } from "@material-ui/core/styles";

const col1 = "#9733EE";
const col2 = "#DA22FF";
const col3 = "#F8F8FF";
const col4 = "#FE5BD6";
const col5 = "#f49d6e";
const col6 = "#000000";
const col7 = "#A0A0A0";

export const lightTheme = createMuiTheme({
	palette: {
		type: "light",
		common: {
			white: `${col3}`,
			black: `${col6}`,
			gray: `${col7}`,
			purple: "#EE82EE",
			magenta: "#FF00FF",
			green: "#00CC33",
		},
		primary: {
			main: `${col1}`,
		},
		secondary: {
			main: `${col5}`,
		},
	},
});

export const darkTheme = createMuiTheme({
	palette: {
		type: "dark",
		common: {
			white: `${col3}`,
			black: `${col6}`,
		},
		primary: {
			main: `${col1}`,
		},
		secondary: {
			main: `${col5}`,
		},
	},
});
