import {Icon} from "@mui/material";
import PropTypes from "prop-types";

function Logo({width, height}) {
	return (
		<Icon>
			<img height={height} width={width} src="/icon.png"></img>
		</Icon>
	);
}

Logo.propTypes = {
	width: PropTypes.number.isRequired,
	height: PropTypes.number.isRequired
};

export default Logo;
