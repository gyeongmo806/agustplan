import React, { useEffect, useState } from "react";
import TextFile from "./TextFile";
import MainImageRead from "./MainImageRead";

function Main() {
	return (
		<div>
			<h1>드래그 앤 드롭 (메인이미지)</h1>
			<MainImageRead />
			<h1>상세설명 입력</h1>
			<h1>드래그 앤 드롭 (컬러뷰)</h1>
			<h1>컬러설명 입력</h1>
			<h1>드래그 앤 드롭 (패브릭뷰)</h1>
			<h1>패브릭설명 입력</h1>
			<h1>피팅인포 입력</h1>
			<h1>드래그 앤 드롭 (본문이미지)</h1>
			<TextFile />
		</div>
	);
}

export default Main;
