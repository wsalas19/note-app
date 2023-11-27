import "./App.css";
import { useState } from "react";
import HeadingControls from "./components/HeadingControls";
import NoteGroup from "./components/NoteGroup";
import CreateNoteModal from "./components/CreateNoteModal";
import { NoteProps } from "./utils/types";
import { FilterOption } from "./utils/types";

function App() {
	let noteData: NoteProps[] = [
		{
			id: 1,
			category: "Work",
			archived: true,
			text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quo praesentium veniam eveniet quas quibusdam recusandae dolorum inventore dicta illum dolorem dolor, iste animi sequi nihil cupiditate tempora ab repudiandae consectetur totam. Ab eligendi, consequuntur deleniti error consectetur officiis eaque?",
			createdAt: "2023-01-01",
		},
		{
			id: 2,
			category: "Work",
			archived: false,
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			createdAt: "2023-01-01",
		},
		{
			id: 3,
			category: "Work",
			archived: true,
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			createdAt: "2023-01-01",
		},
		{
			id: 4,
			category: "Work",
			archived: false,
			text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nulla exercitationem ducimus?",
			createdAt: "2023-01-01",
		},
		{
			id: 5,
			category: "Work",
			archived: false,
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			createdAt: "2023-01-01",
		},
	];

	const [isModalOpen, setIsModalOpen] = useState(false);
	const [notes, setNotes] = useState<NoteProps[]>(noteData);

	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	const filterArchived = (criteria: FilterOption) => {
		if (criteria === "archived") {
			setNotes(noteData.filter((note) => note.archived === true));
		} else if (criteria === "unarchived") {
			setNotes(noteData.filter((note) => note.archived === false));
		} else {
			setNotes(noteData);
		}
	};

	const deleteNote = (id: number) => {
		const rootDelete = noteData.filter((note) => note.id !== id);
		const currentDelete = notes.filter((note) => note.id !== id);
		setNotes(currentDelete);
		noteData = rootDelete;
	};

	const handleNoteCreate = (newNote: { category: string; text: string; archived: boolean }) => {
		// Assuming you have a unique ID generator function
		const newNoteWithId: NoteProps = {
			id: Math.random(),
			createdAt: new Date().toISOString(), // Replace with your date formatting logic
			...newNote,
		};
		noteData.push(newNoteWithId);
		setNotes((prevNotes: NoteProps[]) => [...prevNotes, newNoteWithId]);
	};

	return (
		<>
			<HeadingControls addNote={openModal} filterArchived={filterArchived} />
			<NoteGroup deleteNote={deleteNote} notes={notes} />
			<CreateNoteModal isOpen={isModalOpen} onClose={closeModal} onNoteCreate={handleNoteCreate} />
		</>
	);
}

export default App;
