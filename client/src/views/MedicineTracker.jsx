import {Box, Pagination, Skeleton, Stack, Typography} from "@mui/material";
import MedicineSearchbar from "../components/MedicineSearchbar";
import ThemeSwitcher from "../components/ThemeSwitcher";
import DrugInfo from "../components/DrugInfo";
import {useContext, useEffect, useRef, useState} from "react";
import StatusBar from "../components/StatusBar";
import {SessionDataContext} from "../contexts/SessionDataContext";
import dayjs from "dayjs";

function MedicineTracker() {
	const [drugData, setDrugData] = useState(null);
	const [message, setMessage] = useState("");
	const [open, setOpen] = useState(false);
	const [drugInfoList, setDrugInfoList] = useState([]);
	const [page, setPage] = useState(0);
	const [loading, setLoading] = useState(true);
	const username = useContext(SessionDataContext).sessionData.username;
	const severity = "error";
	const drugNameRef = useRef(null);

	useEffect(() => {
		let ignore = false;

		async function getDrugs() {
			if (ignore) return;
			const getDrugsResponse = await fetch("/api/getdrugs", {
				method: "POST",
				headers: {"Content-Type": "application/json"},
				body: JSON.stringify({username: username})});

			if (getDrugsResponse.status !== 200) {
				setLoading(false);
				return;
			}

			const drugs = await getDrugsResponse.json();
			const fetchDrugDataPromises = drugs.map((drug) => {
				if (drug.drug_id != null) {
					const findDrugDataPromise = fetch("/api/drug/id", {
						method: "POST",
						headers: {"Content-Type": "application/json"},
						body: JSON.stringify({id: drug.drug_id})
					});

					return findDrugDataPromise;
				}

				return new Promise((resolve) => resolve(null));
			});

			const drugDataFetchers = await Promise.all(fetchDrugDataPromises);
			const drugDataPromises = drugDataFetchers.map((drugDataFetcher) => drugDataFetcher == null ? new Promise((resolve) => resolve(null)) : drugDataFetcher.json());
			const drugDatas = await Promise.all(drugDataPromises);

		setPage(1);
			setDrugInfoList(drugs.map((drug, index) => {
				const drugName = drug.drug_name;
				const duration = {
					month: drug.duration_month,
					week: drug.duration_week,
					day: drug.duration_day
				}
				const startDate = dayjs(drug.start_date);
				const times = drug.dose_times.map((time) => dayjs(time));
				const drugData = drugDatas[index] != null ? drugDatas[index].results[0] : null;

				return <DrugInfo key={drugName} drugName={drugName} drugData={drugData} loaded={true} _dosePerDay={times.length} _duration={duration} _startDate={startDate} _times={times}></DrugInfo>;
			}));
			setLoading(false);
		}

		getDrugs();
		return () => { ignore = true; };
		}, [username]);

	function setDrugInfo() {
		if (drugNameRef === null || drugNameRef.current.value === undefined || drugNameRef.current.value === "") {
			setMessage("Enter the name of the medicine!");
			setOpen(true);
			return;
		} 

		setDrugInfoList(drugInfoList.concat([<DrugInfo key={drugNameRef.current.value} drugName={drugNameRef.current.value} drugData={drugData}></DrugInfo>]));
		setPage(drugInfoList.length + 1);
	}

	return (
		<>
			<ThemeSwitcher></ThemeSwitcher>	
			<StatusBar open={open} setOpen={setOpen} severity={severity} message={message}></StatusBar>
			<MedicineSearchbar setDrugInfo={setDrugInfo} setDrugData={setDrugData} drugNameRef={drugNameRef}></MedicineSearchbar>	
			<Box sx={{marginTop: 2, width: "100%", height: "100%"}} display={"flex"} alignItems={"center"} justifyContent={"center"}>
				{!loading ?
					drugInfoList.length !== 0 ?
						<Stack alignItems={"center"} justifyContent={"center"} direction={"column"} spacing={2}>
							{drugInfoList[page - 1]}
							<Pagination onChange={(_, value) => setPage(value)} page={page} count={drugInfoList.length}></Pagination>
						</Stack> :
						<>
							<Stack alignItems={"center"} justifyContent={"center"} spacing={1} direction={"column"}>
								<Typography variant="h4">You haven&apos;t added any medicines yet!</Typography>
								<Typography variant="h4">Use the search bar to search and add medicines.</Typography>
							</Stack>
					</> : 
					<Stack alignItems={"center"} direction={"column"}>
						<Skeleton variant="rectangular" width={400} height={400} />
					</Stack>}
			</Box>
		</>
	);
}

export default MedicineTracker;
