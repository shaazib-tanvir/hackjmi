import {useContext} from "react";
import {AuthContext} from "../contexts/AuthContext";
import {Container, Stack, Typography} from "@mui/material";
import {Link} from "react-router-dom";
import PropTypes from "prop-types";

function ProtectedRoute({children}) {
	const authenticated = useContext(AuthContext).authenticated;

	return authenticated ? children : (
		<>
			<Container sx={{height: "100%"}}>
				<Stack spacing={5} direciton={"column"} sx={{height: "100%"}} alignItems={"center"} justifyContent={"center"}>
					<Typography variant="h2">You are not logged in!</Typography>
					<Typography><Link to="/login">Click here</Link> to go to the login page.</Typography>
				</Stack>	
			</Container>
		</>
	);
}

ProtectedRoute.propTypes = {
	children: PropTypes.node.isRequired
}

export default ProtectedRoute;
