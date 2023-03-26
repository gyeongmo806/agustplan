import React, { useEffect, useState } from "react";
import Parsing from "./Text_Br_Parsing";

export default function ColorView(props) {
	const [colors, setColors] = useState([]);
	const [colorContexts, setColorContexts] = useState([{}]);
	const updated = colors.length === colorContexts.length;
	useEffect(() => {
		console.log("colors : ", colors, "Context : ", colorContexts);

		if (colors.length > 0) {
			if (colors.length > colorContexts.length) {
				console.log("setColorContexts add");
				setColorContexts((colorContexts) => [
					...colorContexts,
					{ value: "" },
				]);
			} else if (colors.length < colorContexts.length) {
				console.log("setColorContexts delete");
				setColorContexts((contexts) =>
					contexts.slice(0, colors.length)
				);
			}
		}
		if (updated) {
			console.log("updatee", updated);
			const expArray = updated
				? colors.map((color, index) => {
						// eslint-disable-next-line no-lone-blocks
						{
							return (
								colorContexts[index].value +
								` <b>#${color}</b><br/>`
							);
						}
				  })
				: [];
			const result = expArray.join("\n");
			console.log(expArray, result);
			props.setColorExp({ html: result, colors: colors });
		}
	}, [colors, colorContexts]);

	function handleColorContextsInput(e) {
		const inputValue = e.target.value;
		const index = e.target.id;
		const newContexts = [...colorContexts];
		newContexts[index].value = inputValue;
		console.log(newContexts);
		setColorContexts(newContexts);
	}

	function handleColorInput(e) {
		const inputValue = e.target.value;
		const sentence = inputValue.split(/[,;]/);
		console.log(colors.length, sentence, colors);
		setColors(sentence);
	}

	return (
		<div>
			<textarea onChange={handleColorInput} />
			{updated
				? colors.map((color, index) => (
						<div key={index}>
							<input
								type="text"
								id={index}
								value={colorContexts[index].value}
								onChange={handleColorContextsInput}
							/>
							<b>#{color}</b>
						</div>
				  ))
				: ""}
		</div>
	);
}
