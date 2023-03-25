import React from "react";
import { useEffect, useState } from "react";

TextFile.defaultProps = {
	mainUrl: "http://aplan92.hgodo.com/page/230223/013/",
	// mainImageUrl: "/a013_09.jpg",
	manufactureCountry: "대한민국",
	manufactureDate: "발송일 기준 6개월 이내",
};

function TextFile(props) {
	const data = { props };
	const [htmlContent, setHtmlContent] = useState("");

	const handleDownload = () => {
		console.log(data);
		const replacedHtmlContent = htmlContent.replace(
			/\$\{(\w+)\}/g,
			(_, key) => {
				// return data.props[key];
				const keys = key.split("."); // key 값을 .을 기준으로 나눕니다.
				let value = data.props[keys[0]]; // 첫 번째 key 값을 사용하여 값을 가져옵니다.
				console.log(value);
				// key 값을 .으로 연결된 여러 개의 속성을 순회하면서 값을 가져옵니다.
				for (let i = 1; i < keys.length; i++) {
					value = value[keys[i]];
				}
				console.log(value);
				return value;
			}
		);
		const file = new Blob([replacedHtmlContent], {
			type: "text/html",
		});
		const element = document.createElement("a");
		element.href = URL.createObjectURL(file);
		element.download = "text.txt";
		document.body.appendChild(element);
		element.click();
		document.body.removeChild(element);
	};
	// const data = {
	// 	mainUrl: "http://", //메인 경로 기본값
	// 	mainImageUrl: props.mainImage,
	// 	colorImageUrl: props.color.imageUrl,
	// 	detailExplain: props.detailExplain,
	// 	colorExplain: props.color.explain,
	// 	fabricImageUrl: props.fabric.imageUrl,
	// 	fabricExplain: props.fabric.explain,
	// 	fittingInfo: props.fittingInfo,
	// 	contentImages: props.contentImages,
	// };

	useEffect(() => {
		console.log("TextFile : useEffect!");
		fetch("HTML/html1.txt")
			.then((response) => response.text())
			.then((htmlContent) => {
				setHtmlContent(htmlContent);
			})
			.catch((error) => console.error(error));
	}, []);

	return (
		<div>
			<button onClick={handleDownload}>Download</button>
		</div>
	);
}

export default TextFile;
