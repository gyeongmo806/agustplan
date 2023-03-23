import React, { useEffect, useState } from "react";
import Parsing from "./Text_Br_Parsing";

export default function ColorView(props) {
	const [value, setValue] = useState("");
	const [colors, setColors] = useState([""]);
	useEffect(() => {
		console.log(value);
		// props.setDetailExp(Parsing(value));
	}, [value]);

	const handleChange = (event) => {
		setValue(event.target.value);
	};
	const handleOnClick = (event) => {
		event.preventDefault();
		setValue(event.target.value);
	};

	return (
		<div>
			<input type="text" value={value} onChange={handleChange} />
			<button onClick={handleOnClick}></button>
		</div>
	);
}
