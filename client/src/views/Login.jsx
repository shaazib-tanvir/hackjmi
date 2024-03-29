import {Box, Button, Container, Paper, Stack, TextField, Typography} from "@mui/material";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenSharp";
import {Link, useNavigate} from "react-router-dom";
import {useContext, useRef, useState} from "react";
import StatusBar from "../components/StatusBar";
import {AuthContext} from "../contexts/AuthContext";
import ThemeSwitcher from "../components/ThemeSwitcher";
import {SessionDataContext} from "../contexts/SessionDataContext";
import Logo from "../components/Logo";

function Login() {
	const [open, setOpen] = useState(false);
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState("error");
	const setSessionData = useContext(SessionDataContext).setSessionData;
	const setAuthenticated = useContext(AuthContext).setAuthenticated;
	const usernameRef = useRef(null);
	const passwordRef = useRef(null);
	const navigate = useNavigate();

	function login(username, password) {
		if (username === "" || password === "") {
			setSeverity("error");
			setMessage("Please enter a username and password.");
			setOpen(true);
		}

		fetch("/api/login", {
			method: "POST",
			body: JSON.stringify({
				username: username,
				password: password
			}),
			headers: {
				"Content-Type": "application/json"
			}}).then((response) => {
				if (response.status === 401) {
					setSeverity("error");
					setMessage("Invalid username or password!");
					setOpen(true);
					return;
				}

				fetch("/api/sessiondata").then((response) => response.json()).then((sessionData) => {
					setSessionData(sessionData);
					setAuthenticated(true);
					navigate("/app/medicinetracker");
				});
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
								Login
							</Typography>
						</Stack>
						<br></br>
						<TextField inputRef={usernameRef} label="Username" variant="outlined"></TextField>
						<TextField inputRef={passwordRef} label="Password" variant="outlined" type="password"></TextField>
						<Button type="submit" onClick={() => login(usernameRef.current.value, passwordRef.current.value)} variant="contained" endIcon={<LockOpenOutlinedIcon></LockOpenOutlinedIcon>}>Login</Button>
						<br></br>
						<Typography>Don&apos;t have an account? <Link to="/register">Register</Link> now!</Typography>
					</Stack>
				</Paper>
			</Box>
			<Box display={"flex"} sx={{height: "100%"}} flexDirection={"column"} justifyContent={"end"} alignItems={"center"}>
				<a href="https://www.flaticon.com/free-icons/patient" title="patient icons">Icon created by RaftelDesign - Flaticon</a>
			</Box>
		</Container>
	);
}

export default Login;
