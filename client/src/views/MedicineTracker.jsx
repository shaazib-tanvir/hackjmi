import {Box} from "@mui/material";
import MedicineSearchbar from "../components/MedicineSearchbar";
import ThemeSwitcher from "../components/ThemeSwitcher";
import DrugInfo from "../components/DrugInfo";
import {useRef, useState} from "react";
import StatusBar from "../components/StatusBar";

function MedicineTracker() {
	const [drugData, setDrugData] = useState(null);
	const [message, setMessage] = useState("");
	const [open, setOpen] = useState(false);
	const [drugInfo, setDrugInfo] = useState(null);
	const severity = "error";
	const drugNameRef = useRef(null);

	function changeDrugInfo() {
		if (drugNameRef === null || drugNameRef.current.value === undefined || drugNameRef.current.value === "") {
			setMessage("Enter the name of the medicine!");
			setOpen(true);
			return;
		} 

		setDrugInfo(<DrugInfo drugName={drugNameRef.current.value} drugData={drugData}></DrugInfo>)
	}

	return (
		<>
			<ThemeSwitcher></ThemeSwitcher>	
			<StatusBar open={open} setOpen={setOpen} severity={severity} message={message}></StatusBar>
			<MedicineSearchbar setDrugInfo={changeDrugInfo} setDrugData={setDrugData} drugNameRef={drugNameRef}></MedicineSearchbar>	
			<Box sx={{marginTop: 2, width: "100%", height: "100%"}} display={"flex"} alignItems={"center"} justifyContent={"center"}>
				{drugInfo}
			</Box>
		</>
	);
}

export default MedicineTracker;
