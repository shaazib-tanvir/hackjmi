import {Container, Drawer, List, ListItem, ListItemButton, ListItemIcon, ListItemText} from "@mui/material";
import ButtonAppBar from "../components/ButtonAppBar";
import {useState} from "react";
import MedicationLiquidIcon from '@mui/icons-material/MedicationLiquid';
import {Outlet, useNavigate} from "react-router-dom";

function App() {
	const [open, setOpen] = useState(false);
	const navigate = useNavigate();

	function toggleDrawer() {
		setOpen(!open);
	}

	return (
		<Container>
			<ButtonAppBar onClick={toggleDrawer}></ButtonAppBar>
			<Drawer open={open} onClose={toggleDrawer}>
				<List>
					<ListItem disablePadding>
						<ListItemButton onClick={() => navigate("/app/medicinetracker")}>
							<ListItemIcon>
								<MedicationLiquidIcon></MedicationLiquidIcon>
							</ListItemIcon>
							<ListItemText primary="Medicine Tracker"></ListItemText>
						</ListItemButton>
					</ListItem>
				</List>
			</Drawer>
				<Outlet></Outlet>
		</Container>
	);
}

export default App;
