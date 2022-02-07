import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import CssBaseline from "@material-ui/core/CssBaseline";
import { CustomThemeContext } from "./Theme/CustomThemeContext";

//?importing pages ------------->
import Login from "./Login";
import Room from "./Room";

const AppRoutes = () => {
	return (
		<CustomThemeContext>
			<CssBaseline />
			<BrowserRouter>
				<Routes>
					<Route path="/" exact strict element={<Login />}></Route>
					<Route path="/room" exact strict element={<Room />}></Route>
				</Routes>
			</BrowserRouter>
		</CustomThemeContext>
	);
};

export default AppRoutes;
