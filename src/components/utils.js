export default function parseCSV(csvString, itemType, sizeInfo) {
	const type = {
		상의: [
			"사이즈",
			"추천사이즈",
			"어깨",
			"가슴",
			"소매길이",
			"암홀",
			"팔통",
			"밑단",
			"총기장",
		],
		바지: [
			"사이즈",
			"추천사이즈",
			"허리",
			"힙",
			"허벅지",
			"밑위",
			"밑단",
			"총기장",
		],
		치마: ["사이즈", "추천사이즈", "허리", "힙", "밑단", "총기장"],
	};
	// CSV 문자열을 줄바꿈 문자(\n)로 분리하여 배열로 변환합니다.
	console.log(csvString);
	const lines = csvString.trim().split("\n");
	console.log(lines[0]);
	// 첫 번째 줄을 컬럼으로 사용합니다.
	console.log(type[itemType]);
	const columns = type[itemType];
	console.log(columns);
	// 나머지 줄은 데이터로 사용합니다.
	const rawRows = lines;

	// 각 줄을 컬럼별로 분리하여 객체로 변환합니다.
	const rows = rawRows.map((rawRow, index) => {
		const values = rawRow.split("\t");
		console.log(sizeInfo);
		return columns.reduce((row, columnName, columnIndex) => {
			if (columnIndex <= 1) {
				if (columnIndex === 0) {
					console.log(sizeInfo[index].size);
					row[columnName] = sizeInfo[index].size;
				}
				if (columnIndex === 1) {
					console.log(sizeInfo[index].start);
					row[columnName] =
						sizeInfo[index].start + "-" + sizeInfo[index].end;
				}
				return row;
			}
			row[columnName] = values[columnIndex - 2];
			return row;
		}, {});
	});

	// 결과를 반환합니다.
	return { columns, rows };
}
