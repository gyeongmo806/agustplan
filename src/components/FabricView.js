import React, { useEffect, useState } from "react";

export default function FabricView(props) {
	const [fabricInfo, setFabricInfo] = useState("");
	const [fabricExp, setFabricExp] = useState("");

	useEffect(() => {
		props.setFabric({ info: fabricInfo, explain: fabricExp });
	}, [fabricInfo, fabricExp]);

	function handlefabricInfoOnChange(e) {
		const input = e.target.value;
		if (!input.includes("100%")) {
			const newValue = input.replace(/ /g, "");
			setFabricInfo(newValue);
			return;
		}
		setFabricInfo(input);
	}
	function handlefabricExpOnChange(e) {
		const input = e.target.value;
		setFabricExp(input);
	}
	return (
		<div>
			<input
				type="text"
				value={fabricInfo}
				onChange={handlefabricInfoOnChange}
			/>
			<input
				type="text"
				value={fabricExp}
				onChange={handlefabricExpOnChange}
			/>
		</div>
	);
}
