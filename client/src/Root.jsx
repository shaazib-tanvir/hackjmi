import {ThemeProvider} from "@emotion/react";
import {CssBaseline, createTheme} from "@mui/material";
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import App from "./views/App";
import ProtectedRoute from "./components/ProtectedRoute";
import {useState} from "react";
import {AuthContext} from "./contexts/AuthContext";
import { ThemeContext } from "./contexts/ThemeContext";

const router = createBrowserRouter(createRoutesFromElements(
	<>
		<Route errorElement={<NotFound></NotFound>} path="/" element={<Login></Login>}></Route>
		<Route errorElement={<NotFound></NotFound>} path="/login" element={<Login></Login>}></Route>
		<Route errorElement={<NotFound></NotFound>} path="/app" element={<ProtectedRoute><App></App></ProtectedRoute>}></Route>
		<Route errorElement={<NotFound></NotFound>} path="/register" element={<Register></Register>}></Route>
	</>
));

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

const lightTheme = createTheme({
	palette: {
		mode: "light"
	}
});

function Root() {
	const [authenticated, setAuthenticated] = useState(false);
	const [enableDarkTheme, setEnableDarkTheme] = useState(true);
	const authenticatedValue = {authenticated, setAuthenticated};
	const themeValue = {enableDarkTheme, setEnableDarkTheme};

	return (
		<ThemeProvider theme={enableDarkTheme ? darkTheme : lightTheme}>
			<CssBaseline></CssBaseline>
			<ThemeContext.Provider value={themeValue}>
				<AuthContext.Provider value={authenticatedValue}>
					<RouterProvider router={router}></RouterProvider>
				</AuthContext.Provider>
			</ThemeContext.Provider>
		</ThemeProvider>
	);
}

export default Root;
