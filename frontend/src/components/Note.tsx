import React, { useState } from "react";
import { NoteProps } from "../utils/types";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditNoteModal from "./EditNoteModal";
import { useNotes } from "../utils/useNotes";

const Note: React.FC<NoteProps> = ({ id, category, archived, text, createdAt, deleteNote }) => {
	const [isModalOpen, setIsModalOpen] = useState({ edit: false, delete: false });
	const { updateNote } = useNotes();

	const openModal = (mode: string) =>
		setIsModalOpen((prev) => {
			return { ...prev, [mode]: true };
		});
	const closeModal = (mode: string) =>
		setIsModalOpen((prev) => {
			return { ...prev, [mode]: false };
		});

	//const truncatedText = text.length > 100 ? `${text.substring(0, 95)}...` : text;
	return (
		<>
			<div
				className={`mb-2 cursor-pointer overflow-clip flex flex-col justify-between rounded-md shadow-md p-4 bg-white ${
					archived ? "border-2 border-gray-300" : "border-2 border-blue-500"
				} lg:w-[20%]`}
			>
				<div className='flex justify-between  items-center mb-2'>
					<div className='flex justify-start gap-2'>
						<span className='category-tag'>
							{category.charAt(0).toUpperCase() + category.slice(1)}
						</span>
						{archived && <span className='archived-tag'>Archived</span>}
					</div>
					<button
						className=' text-red-400 font-bold hover:text-red-600'
						onClick={() => openModal("delete")}
					>
						delete
					</button>
				</div>
				<p
					onClick={() => {
						openModal("edit");
					}}
					className='text-base cut-off'
				>
					{text}
				</p>
				<div className='flex justify-between mt-2 items-center'>
					<span className='text-xs text-gray-500'>{`created at: ${createdAt.slice(0, 10)}`}</span>
					<button
						onClick={() => {
							updateNote.mutate({ id, noteData: { archived: archived ? false : true } });
						}}
						className='text-blue-400 font-bold hover:text-blue-600'
					>
						{archived ? "unarchive" : "archive"}
					</button>
				</div>
			</div>
			<ConfirmDeleteModal
				isOpen={isModalOpen.delete}
				onClose={() => closeModal("delete")}
				id={id}
			/>
			<EditNoteModal
				isOpen={isModalOpen.edit}
				onClose={() => closeModal("edit")}
				NoteData={{ id, category, archived, text, createdAt, deleteNote }}
			/>
		</>
	);
};

export default Note;
