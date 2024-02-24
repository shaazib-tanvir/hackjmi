import AppBar from '@mui/material/AppBar';
import Box from '@mui/material/Box';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import IconButton from '@mui/material/IconButton';
import MenuIcon from '@mui/icons-material/Menu';
import LogoutIcon from '@mui/icons-material/Logout';
import PropTypes from "prop-types";
import {Tooltip} from '@mui/material';
import {useContext} from 'react';
import {AuthContext} from '../contexts/AuthContext';
import {SessionDataContext} from '../contexts/SessionDataContext';

export default function ButtonAppBar({onClick}) {
	const setAuthenticated = useContext(AuthContext).setAuthenticated;
	const username = useContext(SessionDataContext).sessionData.username;

	function logout() {
		setAuthenticated(false);
	}

	return (
		<Box sx={{ flexGrow: 1 }}>
			<AppBar position="static">
				<Toolbar>
					<IconButton
						onClick={onClick}
						size="large"
						edge="start"
						color="inherit"
						aria-label="menu"
						sx={{ mr: 2 }}
						>
						<MenuIcon />
					</IconButton>
					<Typography variant="h5" component="div" sx={{ flexGrow: 1 }}>
						Welcome, {username}.
					</Typography>
					<Tooltip title="Logout">
						<IconButton onClick={logout} aria-label="logout" color="secondary">
						<LogoutIcon></LogoutIcon>
						</IconButton>
					</Tooltip>
				</Toolbar>
			</AppBar>
		</Box>
	);
}

ButtonAppBar.propTypes = {
	onClick: PropTypes.func.isRequired
}
