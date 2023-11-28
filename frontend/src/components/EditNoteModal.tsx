import { EditNoteProp, NoteProps } from "@/utils/types";
import React, { useState, ChangeEvent } from "react";
import Modal from "react-modal";

type EditModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onNoteEdit: (id: number, updatedNote: EditNoteProp) => void;
	NoteData: NoteProps;
};
function EditNoteModal({ isOpen, onClose, onNoteEdit, NoteData }: EditModalProps) {
	const initialState = {
		category: NoteData.category,
		text: NoteData.text,
		archived: NoteData.archived,
	};
	const [newNote, setNewNote] = useState(initialState);

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
		onNoteEdit(NoteData.id, newNote);
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
				className=' rounded-xl center-modal'
				overlayClassName='overlay'
			>
				<div className='flex flex-col p-4'>
					<h2 className='text-2xl font-bold mb-4'>Edit Note</h2>
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
						className='input rounded-sm resize-none h-fit p-1 text-sm '
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
							Edit
						</button>
					</div>
				</div>
			</Modal>
		</>
	);
}

export default EditNoteModal;
