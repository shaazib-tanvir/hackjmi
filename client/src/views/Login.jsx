import {Box, Button, Container, Paper, Stack, TextField, Typography} from "@mui/material";
import LockOpenOutlinedIcon from "@mui/icons-material/LockOpenSharp";
import {Link} from "react-router-dom";

function Login() {
	return (
		<Container sx={{height: "100%"}}>
			<Box display={"flex"} sx={{height: "100%"}} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
				<Paper sx={{maxWidth: 400, minWidth: 400, padding: 4}}>
					<Stack spacing={2} direction={"column"} alignItems={"center"} justifyContent={"center"}>
						<Typography variant="h4">Login</Typography>
						<br></br>
						<TextField label="Username" variant="outlined"></TextField>
						<TextField label="Password" variant="outlined" type="password"></TextField>
						<Button variant="contained" endIcon={<LockOpenOutlinedIcon></LockOpenOutlinedIcon>}>Login</Button>
						<br></br>
						<Typography>Don&apos;t have an account? <Link to="/register">Register</Link> now!</Typography>
					</Stack>
				</Paper>
			</Box>
		</Container>
	);
}

export default Login;
