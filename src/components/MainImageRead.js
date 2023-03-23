import React, { useEffect, useRef, useState } from "react";
import "../styles/FileDrop.css";
export default function MainImageRead() {
	const dropZoneRef = useRef(null);
	const draggedImageIndexRef = useRef(null);
	const [images, setImages] = useState([]);
	useEffect(() => {
		console.log("useEffect Hook!");
	}, [images]);

	function handleDragStart(event, index) {
		draggedImageIndexRef.current = index;
		event.dataTransfer.setData("text/plain", "");
	}
	function handleDragOver(event, index) {
		// 드롭 대상 위에서 드래그 중일 때 실행되는 코드
		event.preventDefault();
		console.log("DragOver", index);
	}
	function handleDrop(event) {
		// 드롭이 완료될 때 실행되는 코드
		console.log("handleDrop");
		event.preventDefault();
		for (let i = 0; i < event.dataTransfer.files.length; i++) {
			const droppedFile = event.dataTransfer.files[i];
			if (droppedFile.type.startsWith("image/")) {
				const reader = new FileReader();
				reader.readAsDataURL(droppedFile);
				reader.onload = function () {
					const imageUrl = reader.result;
					const newImage = { url: imageUrl, name: droppedFile.name };
					setImages((images) => [...images, newImage]);
				};
			} else {
				console.log("이미지 파일이 아닙니다.");
			}
		}
		// if (event.dataTransfer.files[0] === undefined) return;
		// const droppedFile = event.dataTransfer.files[0];
		// 이미지 파일인지 확인
		// if (droppedFile.type.startsWith("image/")) {
		// 	const reader = new FileReader();
		// 	reader.readAsDataURL(droppedFile);
		// 	reader.onload = function () {
		// 		const imageUrl = reader.result;
		// 		const newImage = { url: imageUrl, name: droppedFile.name };
		// 		setImages((images) => [...images, newImage]);
		// 	};
		// } else {
		// 	console.log("이미지 파일이 아닙니다.");
		// }
	}
	function handleDragOverImage(event, index) {
		event.preventDefault();
		const draggedImageIndex = draggedImageIndexRef.current;
		if (draggedImageIndex !== null && draggedImageIndex !== index) {
			const newImages = [...images];
			const draggedImage = newImages[draggedImageIndex];
			newImages.splice(draggedImageIndex, 1);
			newImages.splice(index, 0, draggedImage);
			setImages(newImages);
			draggedImageIndexRef.current = index;
		}
	}
	function handleDragEnd() {
		draggedImageIndexRef.current = null;
	}
	return (
		<div>
			<div
				ref={dropZoneRef}
				className="drop-zone"
				onDragOver={handleDragOver}
				onDrop={handleDrop}
			>
				{images[0] ? <p></p> : <p>메인이미지를 드래그해주세요.</p>}
				{images.map((image, index) => (
					<img
						draggable
						key={index}
						src={image.url}
						alt={image.name}
						onLoad={() => {
							const newImages = [...images];
							newImages[index].loading = false;
							setImages(newImages);
						}}
						onDragStart={(event) => handleDragStart(event, index)}
						onDragOver={(event) =>
							handleDragOverImage(event, index)
						}
						onDragEnd={handleDragEnd}
						// style={{
						// 	display: image.loading ? "none" : "in-line",
						// 	height: 120,
						// 	margin: 100,
						// 	backgroundColor: "black",
						// }}
					/>
				))}
			</div>
			<div>
				{images.map((image, index) => (
					<li key={index}>{image.name}</li>
				))}
			</div>
		</div>
	);
}
