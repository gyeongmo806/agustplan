import React, { useEffect, useState } from "react";
import parseCSV from "./utils";
import ReactDOMServer from "react-dom/server";

function ItemSize(props) {
	const [data, setData] = useState({ columns: [], rows: [] });
	const [sizeValue, setSizeValue] = useState();
	const [sizeInfo, setSizeInfo] = useState();
	const [selectedType, setSelectedType] = useState("상의");

	useEffect(() => {
		console.log(data);
		const html = data.rows.map((row, rowIndex) => (
			<div>
				<tr key={rowIndex}>
					{data.columns.map((column, columnIndex) => (
						<td key={columnIndex}>{row[column]}</td>
					))}
				</tr>
			</div>
		));

		const jsxString = ReactDOMServer.renderToString(html);
		console.log(jsxString);
		props.setSize(sizeInfo);
		props.setSizeHtml(jsxString);
	}, [data]);
	const handlePaste = (event) => {
		const clipboardData = event.clipboardData || window.clipboardData;
		const pastedData = clipboardData.getData("text");
		const parsedData = parseCSV(pastedData, selectedType, sizeInfo);
		console.log(pastedData);
		// sizeInfo.map((size, index) => parsedData.rows.splice(index, 0, size));
		setData(parsedData);
	};

	function handleSelectedType(e) {
		setSelectedType(e.target.value);
	}
	function hadleSizeValueOnChange(e) {
		const str = e.target.value;
		const arr = str.split(",");
		setSizeValue(str);
		const result = arr.map((item) => {
			const regex = /(\w+)\((\d+)-(\d+)\)/;
			const match = regex.exec(item);
			if (!match) {
				return { size: "", start: "", end: "" };
			}
			const [, size, start, end] = match;
			return { size, start, end };
		});
		console.log(result);
		setSizeInfo(result);
	}

	return (
		<div>
			<input
				type="text"
				value={sizeValue}
				onChange={hadleSizeValueOnChange}
			/>
			<div onPaste={handlePaste}>
				<select value={selectedType} onChange={handleSelectedType}>
					<option value="상의">상의</option>
					<option value="바지">바지</option>
					<option value="치마">치마</option>
					<option value="신발">신발</option>
				</select>
				<h1>여기에 붙여넣으세요.</h1>
				<table>
					<thead>
						<tr>
							{data.columns.map((column, columnIndex) => (
								<td key={columnIndex}>{column}</td>
							))}
						</tr>
					</thead>
					<tbody>
						{data.rows.map((row, rowIndex) => (
							<tr key={rowIndex}>
								{data.columns.map((column, columnIndex) => (
									<td key={columnIndex}>
										{row[column] || "-"}
									</td>
								))}
							</tr>
						))}
					</tbody>
				</table>
			</div>
		</div>
	);
}

export default ItemSize;
