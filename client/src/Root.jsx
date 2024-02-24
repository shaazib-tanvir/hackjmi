import {ThemeProvider} from "@emotion/react";
import {CssBaseline, createTheme} from "@mui/material";
import {Route, RouterProvider, createBrowserRouter, createRoutesFromElements} from "react-router-dom";
import Login from "./views/Login";
import Register from "./views/Register";
import NotFound from "./views/NotFound";
import App from "./views/App";

const router = createBrowserRouter(createRoutesFromElements(
	<>
		<Route errorElement={<NotFound></NotFound>} path="/" element={<Login></Login>}></Route>
		<Route errorElement={<NotFound></NotFound>} path="/login" element={<Login></Login>}></Route>
		<Route errorElement={<NotFound></NotFound>} path="/app" element={<App></App>}></Route>
		<Route errorElement={<NotFound></NotFound>} path="/register" element={<Register></Register>}></Route>
	</>
));

const darkTheme = createTheme({
	palette: {
		mode: "dark",
	},
});

function Root() {
	return (
		<ThemeProvider theme={darkTheme}>
			<CssBaseline></CssBaseline>
			<RouterProvider router={router}></RouterProvider>
		</ThemeProvider>
	);
}

export default Root;
