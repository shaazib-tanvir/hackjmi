import HowToRegOutlinedIcon from '@mui/icons-material/HowToRegOutlined';
import {Box, Button, Container, Paper, Stack, TextField, Typography} from "@mui/material";
import {Link} from "react-router-dom";

function Register() {
	return (
		<Container sx={{height: "100%"}}>
			<Box display={"flex"} sx={{height: "100%"}} flexDirection={"column"} alignItems={"center"} justifyContent={"center"}>
				<Paper sx={{maxWidth: 400, minWidth: 400, padding: 4}}>
					<Stack spacing={2} direction={"column"} alignItems={"center"} justifyContent={"center"}>
						<Typography variant="h4">Register</Typography>
						<br></br>
						<TextField label="Username" variant="outlined"></TextField>
						<TextField label="Password" variant="outlined" type="password"></TextField>
						<TextField label="Repeat Password" variant="outlined" type="password"></TextField>
						<Button variant="contained" endIcon={<HowToRegOutlinedIcon></HowToRegOutlinedIcon>}>Register</Button>
						<br></br>
						<Typography>Already have an account? <Link to="/login">Login</Link> here.</Typography>
					</Stack>
				</Paper>
			</Box>
		</Container>
	);
}

export default Register;
