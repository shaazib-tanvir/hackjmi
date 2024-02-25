import {Container, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import ErrorIcon from '@mui/icons-material/Error';

function NotFound() {
	return (
		<Container sx={{height: "100%"}}>
			<Stack spacing={5} direciton={"column"} sx={{height: "100%"}} alignItems={"center"} justifyContent={"center"}>
				<ErrorIcon sx={{fontSize: 128}} color="error"></ErrorIcon>
				<Typography variant="h2">There is no such page!</Typography>
				<Typography><Link to="/login">Click here</Link> to go to the login page.</Typography>
			</Stack>	
		</Container>
	);
}

export default NotFound;
