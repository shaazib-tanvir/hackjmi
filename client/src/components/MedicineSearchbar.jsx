import {Autocomplete, IconButton, Stack, TextField, Tooltip} from "@mui/material";
import AddIcon from '@mui/icons-material/Add';
import {useState} from "react";

function toTitleCase(str) {
	return str.replace(
		/\w\S*/g,
		function(txt) {
			return txt.charAt(0).toUpperCase() + txt.substr(1).toLowerCase();
		}
	);
}

export default function MedicineSearchbar() {
	const [options, setOptions] = useState([]);
	const [results, setResults] = useState([]);

	async function onInputChange(value, reason) {
		if (reason === "reset") {
			onSelect(value);
			return;
		}

		if (value === "") {
			setOptions([]);
			setResults([]);
			return;
		}

	fetch("/api/drug", {
			method: "POST",
			headers: {"Content-Type": "application/json"},
			body: JSON.stringify({name: value})
			}).then((response) => {
				if (response.status != 200) return;

				response.json().then((data) => {
					if (data.results === null || data.results === undefined) {
						setOptions([]);
						setResults([]);
						return;
					}

					const filteredResults = data.results.filter((result) => result.openfda.brand_name !== undefined && result.openfda.brand_name.length > 0);
					setResults(filteredResults);
					setOptions(filteredResults.map((result) => toTitleCase(result.openfda.brand_name[0])));
				});
		});
	}

	function onSelect(value) {
		const result = results.find((result) => result.openfda.brand_name[0].toLowerCase() === value.toLowerCase());
		console.log(result);
	}

	return (
		<Stack direction={"row"} spacing={2} alignItems={"center"}>
			<Autocomplete
				freeSolo
				sx={{width: 350, float: "left"}}
				onInputChange={(_, value, reason) => onInputChange(value, reason)}
				options={options}
				renderInput={(params) => <TextField {...params} label="Enter the medicine you want to add"/>}
			/>
			<Tooltip title="Add">
				<IconButton sx={{margin: "auto"}}>
				<AddIcon></AddIcon>
				</IconButton>
			</Tooltip>
		</Stack>
	);
}
