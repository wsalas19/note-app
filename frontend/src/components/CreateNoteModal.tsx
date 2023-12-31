import { NoteModalProps } from "@/utils/types";
import { useNotes } from "../utils/useNotes";
import React, { ChangeEvent, useState } from "react";
import Modal from "react-modal";

function CreateNoteModal({ isOpen, onClose }: NoteModalProps) {
	const initialState = {
		category: "all",
		text: "",
		archived: false,
	};
	const [newNote, setNewNote] = useState(initialState);
	const { addNote } = useNotes();

	const handleInputChange = (
		e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLInputElement>,
	) => {
		const { name, value, type } = e.target;

		setNewNote((prevNote) => ({
			...prevNote,
			[name]: type === "checkbox" ? (e.target as HTMLInputElement).checked : value,
		}));
	};

	const handleNoteCreation = () => {
		addNote.mutate(newNote);
		setNewNote(initialState);
		onClose();
	};

	const handleCategoryChange = (event: ChangeEvent<HTMLSelectElement>) => {
		setNewNote((prev) => {
			return { ...prev, category: event.target.value };
		});
	};

	return (
		<>
			{isOpen && <div className='overlay'></div>}
			<Modal
				isOpen={isOpen}
				onRequestClose={onClose}
				className=' rounded-lg center-modal w-[20%]'
				overlayClassName='overlay'
			>
				<div className='flex flex-col '>
					<h2 className='text-2xl font-bold mb-4'>Create a New Note</h2>
					<label className='mb-2 mr-2'>Category </label>
					<select className='btn-primary' value={newNote.category} onChange={handleCategoryChange}>
						<option value='all'>All Categories</option>
						<option value='generic'>Generic</option>
					</select>
					<label className='mb-2'>Text</label>
					<textarea
						name='text'
						value={newNote.text}
						onChange={handleInputChange}
						placeholder='Write the content here...'
						className='input rounded-sm resize-none p-1 text-sm '
					/>
					<label className='mb-2 mr-2'>
						Archived
						<input
							className='ml-2'
							type='checkbox'
							name='archived'
							checked={newNote.archived}
							onChange={handleInputChange}
						/>
					</label>
					<div className='flex justify-end'>
						<button className='btn-secondary mr-2' onClick={onClose}>
							Cancel
						</button>
						<button
							className='btn-primary'
							onClick={handleNoteCreation}
							disabled={newNote.category === "all" || newNote.text === ""}
						>
							Create
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default CreateNoteModal;
