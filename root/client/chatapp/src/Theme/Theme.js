import { createTheme } from "@material-ui/core/styles";
export const lightTheme = createTheme({
	typography: {
		fontFamily: ["Montserrat"],
	},
	palette: {
		type: "light",
		common: {
			online: "#16b83e",
			sidebar: "",
			textInput: "#DCDCDC",
			textInputBackground: "#F0F0F0",
			chatMessageBackground: "#ebebeb",
			messageText: "#2b2b2b",
			diffMsgName: "#3498db",
			timestamp: "#999",
		},
		primary: {
			main: "#00B4D8",
			light: "#DCF8C6",
		},
		secondary: {
			main: "#393E46",
		},
	},
});

export const darkTheme = createTheme({
	typography: {
		fontFamily: ["Montserrat"],
	},
	palette: {
		type: "dark",
		common: {
			online: "#16b83e",
			sidebar: "#404040",
			textInput: "#707070",
			textInputBackground: "#606060",
			chatBackground: "#404040",
			chatMessageBackground: "#606060",
			messageText: "white",
			diffMsgName: "#90E0EF",
			timestamp: "white",
		},
		primary: {
			// main: "#00ADB5",
			main: "#00B4D8",
			// light: "#b8e3e6",
			light: "#DCF8C6",
		},
		secondary: {
			main: "#393E46",
		},
	},
});
