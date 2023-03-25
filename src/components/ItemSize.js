import React, { useState } from "react";
import ReactDataGrid from "react-data-grid";
export default function ItemSize() {
	const [rows, setRows] = useState([
		{ id: 1, title: "Task 1", priority: "High" },
		{ id: 2, title: "Task 2", priority: "Medium" },
		{ id: 3, title: "Task 3", priority: "Low" },
	]);

	const handleGridRowsUpdated = ({ fromRow, toRow, updated }) => {
		setRows((prevRows) => {
			const updatedRows = [...prevRows];
			for (let i = fromRow; i <= toRow; i++) {
				updatedRows[i] = { ...updatedRows[i], ...updated };
			}
			return updatedRows;
		});
	};

	const rowGetter = ({ index }) => rows[index];

	const columns = [
		{ key: "id", name: "ID" },
		{ key: "title", name: "Title" },
		{ key: "priority", name: "Priority" },
	];

	return (
		<ReactDataGrid
			columns={columns}
			rowGetter={rowGetter}
			rowsCount={rows.length}
			onGridRowsUpdated={handleGridRowsUpdated}
		/>
	);
}
