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
				return data.props[key];
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
