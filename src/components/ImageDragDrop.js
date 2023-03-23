import React, { useEffect, useRef, useState } from "react";
import "../styles/DropZone.css";
export default function ImageDragDrop(props) {
	const dropZoneRef = useRef(null);
	const draggedImageIndexRef = useRef(null);
	const [images, setImages] = useState([]);

	useEffect(() => {
		console.log("ImageDragDrop : useEffect Hook!");
		props.setMainImg(
			images.map((image) => {
				return image.name;
			})
		);
	}, [images]);

	function handleDragStart(event, index) {
		console.log("ImageDragDrop : handleDragStart!");
		draggedImageIndexRef.current = index;
		event.dataTransfer.setData("text/plain", "");
	}

	function handleDragOver(event, index) {
		// 드롭 대상 위에서 드래그 중일 때 실행되는 코드
		console.log("ImageDragDrop : handleDragOver!");

		event.preventDefault();
	}
	function handleDrop(event) {
		// 드롭이 완료될 때 실행되는 코드
		console.log("ImageDragDrop : handleDrop!");

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
		console.log("ImageDragDrop : handleDragOverImage!");

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
		console.log("ImageDragDrop : handleDragEnd!");

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
