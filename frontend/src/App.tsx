import "./App.css";
import { useState } from "react";
import HeadingControls from "./components/HeadingControls";
import NoteGroup from "./components/NoteGroup";
import CreateNoteModal from "./components/CreateNoteModal";
import { useNotes } from "./utils/useNotes";

function App() {
	const { notes, addNote, deleteNote, updateNote, filterArchived } = useNotes();

	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<>
			<HeadingControls addNote={openModal} filterArchived={filterArchived} />
			<NoteGroup deleteNote={deleteNote} updateNote={updateNote} notes={notes} />
			<CreateNoteModal isOpen={isModalOpen} onClose={closeModal} onNoteCreate={addNote} />
		</>
	);
}

export default App;
