import React, { useEffect, useState } from "react";
import styled from "styled-components";

const StyledSelect = styled.select`
	font-size: 16px;
	padding: 10px;
	border: 1px solid #ccc;
	border-radius: 5px;
	background-color: #fff;
	color: #333;
`;
const StyledOption = styled.option`
	font-size: 16px;
`;
export default function FittingInfo(props) {
	const [selectedColor, setSelectedColor] = useState("");
	const [selectedSize, setSelectedSize] = useState("");
	const [value, setValue] = useState("");
	const colors = props.colors;
	const sizes = props.sizes.map((item) => item.size);

	console.log(sizes, props.colors);
	useEffect(() => {
		if (sizes !== "undefined") {
			// sizes = sizes.
		}
		props.setFitting({ color: selectedColor, size: selectedSize });
	}, [selectedColor, selectedSize]);
	function handleColorChange(e) {
		setSelectedColor(e.target.value);
	}
	function handleSizeChange(e) {
		setSelectedSize(e.target.value);
	}
	return (
		<div>
			<StyledSelect
				size="5"
				value={selectedColor}
				onChange={handleColorChange}
			>
				{colors
					? colors.map((color) => (
							<StyledOption value={color}>{color}</StyledOption>
					  ))
					: ""}
			</StyledSelect>
			<StyledSelect
				size="5"
				value={selectedSize}
				onChange={handleSizeChange}
			>
				{colors
					? sizes.map((size) => (
							<StyledOption value={size}>{size}</StyledOption>
					  ))
					: ""}
			</StyledSelect>
		</div>
	);
}
