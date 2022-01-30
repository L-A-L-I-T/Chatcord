import React, { useState, useContext } from "react";
import { ThemeProvider } from "@material-ui/styles";
import { lightTheme, darkTheme } from "./Theme";
const ThemeChangeContext = React.createContext();
const ThemeContext = React.createContext();
export function useThemeUpdate() {
	return useContext(ThemeChangeContext);
}
export function useThemeContext() {
	return useContext(ThemeContext);
}

export function CustomThemeContext({ children }) {
	const [darkMode, setDarkMode] = useState(false);
	const toggleTheme = () => {
		setDarkMode(!darkMode);
	};
	return (
		<ThemeContext.Provider value={darkMode}>
			<ThemeChangeContext.Provider value={toggleTheme}>
				<ThemeProvider theme={darkMode ? darkTheme : lightTheme}>
					{children}
				</ThemeProvider>
			</ThemeChangeContext.Provider>
		</ThemeContext.Provider>
	);
}
