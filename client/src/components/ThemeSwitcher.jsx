import {ThemeContext} from "../contexts/ThemeContext";
import {Box, Switch, Typography} from "@mui/material";
import {useContext} from "react";

function ThemeSwitcher() {
	const {enableDarkTheme, setEnableDarkTheme} = useContext(ThemeContext);

	function switchTheme() {
		setEnableDarkTheme(!enableDarkTheme);
	}

	return (
		<Box display={"flex"} justifyContent={"right"} alignItems={"center"} paddingTop={2}>
			<Typography>Enable Dark Theme</Typography>
			<Switch onClick={switchTheme} checked={enableDarkTheme} size="medium"></Switch>
		</Box>
	);
}

export default ThemeSwitcher;
