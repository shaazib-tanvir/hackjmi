import {ThemeProvider} from "@emotion/react";
import {CssBaseline, createTheme} from "@mui/material";

const darkTheme = createTheme({
  palette: {
    mode: 'dark',
  },
});

function Root() {
	return (
		<ThemeProvider theme={darkTheme}>
		<CssBaseline></CssBaseline>
		</ThemeProvider>
	);
}

export default Root;
