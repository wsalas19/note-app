import "./App.css";
import { useState } from "react";
import HeadingControls from "./components/HeadingControls";
import NoteGroup from "./components/NoteGroup";
import CreateNoteModal from "./components/CreateNoteModal";
//import { useNotes } from "./utils/useNotes.tsx";
import { useQuery } from "@tanstack/react-query";
import { getNotes } from "./utils/apiService.ts";

function App() {
	//const { notes, isLoading } = useNotes();

	const notesQuery = useQuery({ queryKey: ["notes"], queryFn: getNotes });

	const [isModalOpen, setIsModalOpen] = useState(false);
	const openModal = () => setIsModalOpen(true);
	const closeModal = () => setIsModalOpen(false);

	return (
		<>
			<HeadingControls openModal={openModal} />
			{notesQuery.isLoading ? (
				<p className=' font-bold text-gray-400 text-center p-5'>Loading...</p>
			) : (
				<NoteGroup notes={notesQuery.data} />
			)}

			<CreateNoteModal isOpen={isModalOpen} onClose={closeModal} />
		</>
	);
}

export default App;
