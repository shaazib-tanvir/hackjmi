import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import {Box, Button, Container, Paper, Stack, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import StatusBar from '../components/StatusBar';
import {useRef, useState} from 'react';
import ThemeSwitcher from '../components/ThemeSwitcher';
import Logo from '../components/Logo';

function Register() {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState("error");
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);
	const repeatPasswordRef = useRef(null);

	function register(username, password, repeatPassword) {
		if (password !== repeatPassword) {
			setSeverity("error");
			setMessage("Please enter the same password!");
			setOpen(true);
			return;
		}

		fetch("/api/register", {
			method: "POST",
			body: JSON.stringify({
				username: username,
				password: password
			}),
			headers: {
				"Content-Type": "application/json"
			}
		}).then((response) => {
			if (response.status == 401) {
					setSeverity("error");
					setMessage("Username already exists!");
					setOpen(true);
					return null;
			} else if (response.status != 200) {
					setSeverity("error");
					setMessage("Error: " + response.status);
					setOpen(true);
					return null;
			}

			setSeverity("success");
			setMessage("Successfully registered!");
			setOpen(true);
		});
	}

	return (
		<Container sx={{height: "100%"}}>
			<ThemeSwitcher></ThemeSwitcher>
			<StatusBar severity={severity} message={message} open={open} setOpen={setOpen}></StatusBar>
			<Box display={"flex"} sx={{height: "100%"}} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
				<Paper sx={{maxWidth: 400, minWidth: 400, padding: 4}}>
					<Stack spacing={2} direction={"column"} alignItems={"center"} justifyContent={"center"}>
						<Stack alignItems={"center"} spacing={1} direction={"row"}>
						<Logo width={32} height={32}></Logo>
						<Typography variant="h4">
							Register
						</Typography>
						</Stack>
						<br></br>
						<TextField inputRef={usernameRef} label="Username" variant="outlined"></TextField>
						<TextField inputRef={passwordRef} label="Password" variant="outlined" type="password"></TextField>
						<TextField inputRef={repeatPasswordRef} label="Repeat Password" variant="outlined" type="password"></TextField>
						<Button type="submit" onClick={() => register(usernameRef.current.value, passwordRef.current.value, repeatPasswordRef.current.value)} variant="contained" endIcon={<HowToRegOutlinedIcon></HowToRegOutlinedIcon>}>Register</Button>
						<br></br>
						<Typography>Already have an account? <Link to="/login">Login</Link> here.</Typography>
					</Stack>
				</Paper>
			</Box>
		</Container>
	);
}

export default Register;
