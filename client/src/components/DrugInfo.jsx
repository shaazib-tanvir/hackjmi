import {Button, Card, CardActions, CardContent, Divider, Stack, TextField, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";
import {useContext, useEffect, useState} from "react";
import LinearProgressWithLabel from "./LinearProgressWithLabel";
import "dayjs/locale/en-in";
import {SessionDataContext} from "../contexts/SessionDataContext";
import PropTypes from "prop-types";
import StatusBar from "./StatusBar";
import addNotification from "react-push-notification";

export default function DrugInfo({drugName, drugData, _dosePerDay = 1, _duration = { month: "0", week: "0", day: "0" }, _startDate = null, _times = null, loaded = false}) {
	const [dosePerDay, setDosePerDay] = useState(_dosePerDay);	
	const [duration, setDuration] = useState(_duration);
	const [startDate, setStartDate] = useState(_startDate);
	const [times, setTimes] = useState(Array(Number(dosePerDay)).fill(null));
	const [message, setMessage] = useState("");
	const [severity, setSeverity] = useState("error");
	const [open, setOpen] = useState(false);

	const sessionData = useContext(SessionDataContext).sessionData;
	const timePickers = [...Array(Number(dosePerDay)).keys()].map((index) => {
		return <TimePicker value={times[index]} onChange={(value) => setTimes(times.map((previous_value, j) => (index === j ? value : previous_value)))} key={index} label="Time"></TimePicker>;
	});

	useEffect(() => {
		if (loaded) {
			setTimes(_times);
		}
		}, [_times, loaded]);

	useEffect(() => {
		const interval = setInterval(() => {
			times.map((time) => {
				if (time != null) {
					const date = dayjs(time);
					const now = dayjs();
					const updatedTime = now.hour(date.hour()).minute(date.minute()).second(date.second());

					const minutes = now.diff(updatedTime, "minute", true);
					if (-1 < minutes && minutes < 0) {

					addNotification({
							title: "Reminder to take medicine",
							message: `It is time to take ${drugName}.`,
							theme: "darkblue",
							native: true
						});
					}
				}
			});
		}, 60000);

		return () => clearInterval(interval);
		}, [times, drugName]);

	function saveDrug() {
		const username = sessionData.username;
		const id = (drugData !== null && drugData !== undefined) ? drugData.id : null;
		if (startDate === null || startDate === undefined || !startDate.isValid()) {
			setSeverity("error");
			setMessage("Enter a valid start date!");
			setOpen(true);
			return;
		}

		if (duration.day == "0" && duration.week == "0" && duration.month == "0") {
			setSeverity("error");
			setMessage("Enter the duration of the medicine!");
			setOpen(true);
			return;
		}

		if (times.length === 0 || times.includes(null)) {
			setSeverity("error");
			setMessage("Enter the time of the dose!");
			setOpen(true);
			return;
		}

		const data = {
			username: username,
			drug_name: drugName,
			drug_id: id,
			start_date: startDate.toDate(),
			duration_month: Number(duration.month),
			duration_week: Number(duration.week),
			duration_day: Number(duration.day),
			dose_times: times
		};

		fetch("/api/createdrug", {
			method: "POST",
			headers: { "Content-Type": "application/json" },
			body: JSON.stringify(data)
			}).then((response) => {
				if (response.status !== 200) {
					setSeverity("error");
					setMessage("Something went wrong!");
					setOpen(true);
					return;
				}

				setSeverity("success");
				setMessage("Successfully saved medicine!");
				setOpen(true);
		});
	}

	function updateDrug() {
	}

	function progress() {
		const days = Number(duration.month) * 30 + Number(duration.week) * 7 + Number(duration.day);
		if (days === 0) return 0;

		const daysSpent = dayjs().diff(startDate, "day");
		return daysSpent < days ? (daysSpent / days) * 100 : 100;
	}

	function onDoseChange(value) {
		if (value === "" || Number(value) < 1) {
			setDosePerDay("1");
			return;
		}

		setDosePerDay(value);
		setTimes(times.concat([null]));
	}

	function onChangeDuration(value, parameter) {
		if (value === "" || Number(value) < 0) {
			return;
		}

		switch(parameter) {
			case "month":
				setDuration({month: value, week: duration.week, day: duration.day});
			break;
			case "week":
				setDuration({month: duration.month, week: value, day: duration.day});
			break;
			case "day":
				setDuration({month: duration.month, week: duration.week, day: value});
			break;
		}
	}

	return (
		<>
			<StatusBar message={message} severity={severity} open={open} setOpen={setOpen}></StatusBar>
			<Card sx={{width: "50%"}}>
				<CardContent>
					<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
						Name
					</Typography>
					<Typography variant="h5" component="div">
						{drugName}
					</Typography>
					<Typography sx={{ mb: 1.5 }} color="text.secondary">
						{drugData !== null && drugData !== undefined && drugData.purpose !== undefined ? drugData.purpose : null}
					</Typography>
					<Typography variant="body3">
						{drugData !== null && drugData !== undefined && drugData.indications_and_usage !== undefined ? drugData.indications_and_usage : null}
					</Typography>
					<Divider sx={{marginTop: 2, marginBottom: 2}}></Divider>
					<LocalizationProvider adapterLocale="en-in" dateAdapter={AdapterDayjs}>
						<Stack spacing={1}>
							<DatePicker onChange={(value) => setStartDate(value)} value={startDate} label="Start Date"></DatePicker>
							<TextField label="Dose Per Day" type="number" value={dosePerDay} onChange={(event) => onDoseChange(event.target.value)}></TextField>
							{timePickers}
							<Typography color={"text.secondary"} sx={{fontSize: 14}}>Duration</Typography>
							<Stack direction={"row"} spacing={0.5}>
								<TextField onChange={(event) => onChangeDuration(event.target.value, "month")} value={duration.month} label="Month" type="number"></TextField>
								<TextField onChange={(event) => onChangeDuration(event.target.value, "week")} value={duration.week} label="Week" type="number"></TextField>
								<TextField onChange={(event) => onChangeDuration(event.target.value, "day")} value={duration.day} label="Day" type="number"></TextField>
							</Stack>
							<LinearProgressWithLabel color="success" value={progress()}></LinearProgressWithLabel>
						</Stack>
					</LocalizationProvider>
					<Divider sx={{marginTop: 2}}></Divider>
				</CardContent>
				<CardActions>
					{loaded ? <Button onClick={() => updateDrug()} size="small">Update</Button> : <Button onClick={() => saveDrug()} size="small">Save</Button>}
				</CardActions>
			</Card>
		</>
	);
}

DrugInfo.propTypes = {
	drugName: PropTypes.string.isRequired,
	drugData: PropTypes.object,
	_dosePerDay: PropTypes.number,
	_duration: PropTypes.object,
	_startDate: PropTypes.any,
	_times: PropTypes.any,
	loaded: PropTypes.bool
}
