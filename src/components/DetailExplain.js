import React, { useEffect, useState } from "react";
import Parsing from "./Text_Br_Parsing";
export default function DetailExplain(props) {
	const [value, setValue] = useState("");

	useEffect(() => {
		console.log(value);
		props.setDetailExp(Parsing(value));
	}, [value]);

	const handleChange = (event) => {
		setValue(event.target.value);
	};

	return (
		<textarea
			style={{
				border: "1px solid #ccc",
				borderRadius: "4px",
				padding: "8px",
				fontSize: "14px",
				lineHeight: "1.5",
				minHeight: "400px",
				width: "50%",
				resize: "vertical",
				textAlign: "center",
			}}
			value={value}
			onChange={handleChange}
		/>
	);
}
