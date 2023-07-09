import { React, useContext } from "react";
import DeleteIcon from "@mui/icons-material/Delete";
import EditIcon from '@mui/icons-material/Edit';
import { Themecontext } from "./App";

function Note(props) {
	const { theme } = useContext(Themecontext);
	function handleClick() {
		props.onDelete(props.id);
	}
	function handleEdit() {
		props.onEdit(props)
	}

	return (
		<div
			style={{
				backgroundColor: theme ? "black" : "white",
				boxShadow: !theme
					? "0 1px 5px rgb(138, 137, 137)"
					: "0 0 10px 5px rgba(255, 255, 255, 0.1)"
			}}
			className="note"
		>
			<h1 style={{ color: !theme ? "black" : "white" }}>{props.title}</h1>
			<p style={{ color: !theme ? "black" : "white" }}>{props.content}</p>
			<button
				style={{ backgroundColor: theme ? "black" : "white" }}
				onClick={handleClick}
			>
				<DeleteIcon />
			</button>
			<button
				style={{ backgroundColor: theme ? "black" : "white" }}
				onClick={handleEdit}
			>
				<EditIcon />
			</button>
		</div>
	);
}

export default Note;
