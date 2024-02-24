import {Button, Card, CardActions, CardContent, Divider, Stack, TextField, Typography} from "@mui/material";
import {DatePicker, LocalizationProvider, TimePicker} from "@mui/x-date-pickers";
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs'
import dayjs from "dayjs";
import {useState} from "react";
import LinearProgressWithLabel from "./LinearProgressWithLabel";

export default function DrugInfo() {
	const [dosePerDay, setDosePerDay] = useState(1);	
	const [duration, setDuration] = useState({month: "0", week: "0", day: "0"});
	const [startDate, setStartDate] = useState(dayjs());
	const timePickers = [...Array(Number(dosePerDay)).keys()].map((index) => {
		return <TimePicker key={index} label="Time"></TimePicker>;
	});

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
		<Card sx={{width: "25%"}}>
			<CardContent>
				<Typography sx={{ fontSize: 14 }} color="text.secondary" gutterBottom>
					Name
				</Typography>
				<Typography variant="h5" component="div">
					Aspirin
				</Typography>
				<Typography sx={{ mb: 1.5 }} color="text.secondary">
					Pain reliever
				</Typography>
				<Typography variant="body3">
					Uses for the temporary relief of minor aches and pains or as recommended by your doctor. Because of its delayed action, this product will not provide fast relief of headaches or other symptoms needing immediate relief. ask your doctor about other uses for safety coated 81 mg aspirin
				</Typography>
				<Divider sx={{marginTop: 2, marginBottom: 2}}></Divider>
				<LocalizationProvider dateAdapter={AdapterDayjs}>
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
				<Button size="small">Save</Button>
			</CardActions>
		</Card>
	);
}
