import React, { useState } from "react";
import TextFile from "./TextFile";
import ImageDragDrop from "./ImageDragDrop";
import DetailExplain from "./DetailExplain";
import ColorView from "./ColorView";
import FabricView from "./FabricView";
import FittingInfo from "./FittingInfo";
import ItemSize from "./ItemSize";

function Main() {
	const [mainImg, setMainImg] = useState("");
	const [detailExp, setDetailExp] = useState([""]);
	const [colorImg, setColorImg] = useState("");
	const [colorExplain, setColorExp] = useState({
		html: "",
		colors: "",
	});
	const [fabricImg, setFabricImg] = useState("");
	const [fabricExp, setFabricExp] = useState("");
	const [fabric, setFabric] = useState({ info: "", explain: "" });
	const [fitting, setFitting] = useState({ color: "", size: "" });
	const [sizes, setSizes] = useState();
	const [sizeHtml, setSizeHtml] = useState();
	return (
		<div>
			<h1>드래그 앤 드롭 (메인이미지)</h1>
			<ImageDragDrop setImg={setMainImg} />
			<h1>상세설명 입력</h1>
			<DetailExplain setDetailExp={setDetailExp} />
			<h1>드래그 앤 드롭 (컬러뷰)</h1>
			<ImageDragDrop setImg={setColorImg} />
			<h1>컬러설명 입력</h1>
			<ColorView setColorExp={setColorExp} />
			<h1>드래그 앤 드롭 (패브릭뷰)</h1>
			<ImageDragDrop setImg={setFabricImg} />
			<h1>패브릭설명 입력</h1>
			<FabricView setFabric={setFabric} />
			<h1>사이즈 정보 입력</h1>
			<ItemSize setSize={setSizes} setSizeHtml={setSizeHtml} />
			<h1>피팅인포 입력</h1>
			{sizes ? (
				<FittingInfo
					setFitting={setFitting}
					colors={colorExplain.colors}
					sizes={sizes}
				/>
			) : (
				""
			)}

			<h1>드래그 앤 드롭 (본문이미지)</h1>
			<TextFile
				mainImageUrl={mainImg}
				detailExplain={detailExp}
				colorImageUrl={colorImg}
				colorExplain={colorExplain.html}
				fabricImageUrl={fabricImg}
				fabricInfo={fabric.info}
				fabricExplain={fabric.explain}
				fittingColor={fitting.color}
				fittingSize={fitting.size}
				colors={colorExplain.colors}
				sizeHtml={sizeHtml}
			/>
		</div>
	);
}

export default Main;
