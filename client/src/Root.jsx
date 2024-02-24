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
import {SessionDataContext} from "./contexts/SessionDataContext";
import MedicineTracker from "./views/MedicineTracker";

const router = createBrowserRouter(createRoutesFromElements(
	<>
		<Route errorElement={<NotFound></NotFound>} path="/" element={<Login></Login>}></Route>
		<Route errorElement={<NotFound></NotFound>} path="/login" element={<Login></Login>}></Route>
		<Route errorElement={<NotFound></NotFound>} path="/app" element={<ProtectedRoute><App></App></ProtectedRoute>}>
			<Route errorElement={<NotFound></NotFound>} path="/app/medicinetracker" element={<MedicineTracker></MedicineTracker>}></Route>
		</Route>
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
	const [sessionData, setSessionData] = useState(null);
	const sessionDataValue = {sessionData, setSessionData};
	const authenticatedValue = {authenticated, setAuthenticated};
	const themeValue = {enableDarkTheme, setEnableDarkTheme};

	return (
		<ThemeProvider theme={enableDarkTheme ? darkTheme : lightTheme}>
			<CssBaseline></CssBaseline>
			<ThemeContext.Provider value={themeValue}>
				<AuthContext.Provider value={authenticatedValue}>
					<SessionDataContext.Provider value={sessionDataValue}>
						<RouterProvider router={router}></RouterProvider>
					</SessionDataContext.Provider>
				</AuthContext.Provider>
			</ThemeContext.Provider>
		</ThemeProvider>
	);
}

export default Root;
