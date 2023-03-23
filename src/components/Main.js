import React, { useState } from "react";
import TextFile from "./TextFile";
import ImageDragDrop from "./ImageDragDrop";
import DetailExplain from "./DetailExplain";
import ColorView from "./ColorView";

function Main() {
	const [mainImg, setMainImg] = useState([""]);
	const [detailExp, setDetailExp] = useState([""]);
	function handleImageData(data) {
		setMainImg(data);
		console.log(data);
	}
	return (
		<div>
			<h1>드래그 앤 드롭 (메인이미지)</h1>
			<ImageDragDrop setMainImg={setMainImg} />
			<h1>상세설명 입력</h1>
			<DetailExplain setDetailExp={setDetailExp} />
			<h1>드래그 앤 드롭 (컬러뷰)</h1>
			<ColorView />
			<h1>컬러설명 입력</h1>
			<h1>드래그 앤 드롭 (패브릭뷰)</h1>
			<h1>패브릭설명 입력</h1>
			<h1>피팅인포 입력</h1>
			<h1>드래그 앤 드롭 (본문이미지)</h1>
			<TextFile mainImageUrl={mainImg} detailExplain={detailExp} />
		</div>
	);
}

export default Main;
