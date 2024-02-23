import {Alert, Snackbar} from "@mui/material";
import PropTypes from "prop-types";

function StatusBar({message, severity, open, setOpen}) {
	return (
		<Snackbar open={open} autoHideDuration={2000} onClose={() => {
			setOpen(false);
			}}>
			<Alert
				onClose={() => {
					setOpen(false);
				}}
				severity={severity}
				variant="filled"
				sx={{ width: '100%' }}
				>
				{message}
			</Alert>
		</Snackbar>
	);
}

StatusBar.propTypes = {
	message: PropTypes.string.isRequired,
	severity: PropTypes.string.isRequired,
	open: PropTypes.bool.isRequired,
	setOpen: PropTypes.func.isRequired
}

export default StatusBar;
