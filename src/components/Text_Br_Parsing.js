export default function Parsing(value) {
	const sentences = value.split("\n");
	const data = sentences.map((sentence) => sentence + "<br/>");
	console.log(data.join("\n"));
	return data.join("\n");
}
