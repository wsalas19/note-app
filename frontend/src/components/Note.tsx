import React, { useState } from "react";
import { NoteProps } from "../utils/types";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
//import EditNoteModal from "./EditNoteModal";

const Note: React.FC<NoteProps> = ({ category, archived, text, createdAt, deleteNote }) => {
	const [isModalOpen, setIsModalOpen] = useState({ edit: false, delete: false });

	const openModal = (mode: string) =>
		setIsModalOpen((prev) => {
			return { ...prev, [mode]: true };
		});
	const closeModal = (mode: string) =>
		setIsModalOpen((prev) => {
			return { ...prev, [mode]: true };
		});
	const handleDelete = () => {
		if (deleteNote) {
			deleteNote();
		}
	};
	//const truncatedText = text.length > 100 ? `${text.substring(0, 95)}...` : text;
	return (
		<>
			<div
				className={`mb-2 cursor-pointer overflow-clip flex flex-col justify-between rounded-md shadow-md p-4 bg-white ${
					archived ? "border-2 border-gray-300" : "border-2 border-blue-500"
				} lg:w-[20%]`}
				onClick={() => {
					openModal("edit");
				}}
			>
				<div className='flex justify-between  items-center mb-2'>
					<div className='flex justify-start gap-2'>
						<span className='category-tag'>{category}</span>
						{archived && <span className='archived-tag'>Archived</span>}
					</div>
					<button className='btn-secondary' onClick={() => openModal("delete")}>
						delete
					</button>
				</div>
				<p className='text-base cut-off'>{text}</p>
				<div className='flex justify-end mt-2'>
					<span className='text-xs text-gray-500'>{createdAt}</span>
				</div>
			</div>
			<ConfirmDeleteModal
				isOpen={isModalOpen.delete}
				onClose={() => closeModal("delete")}
				deleteFn={handleDelete}
			/>
			{/* 	<EditNoteModal isOpen={isModalOpen.edit} onClose={() => closeModal("edit")} /> */}
		</>
	);
};

export default Note;
