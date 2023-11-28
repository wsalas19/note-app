import React, { useState } from "react";
import { NoteProps } from "../utils/types";
import ConfirmDeleteModal from "./ConfirmDeleteModal";
import EditNoteModal from "./EditNoteModal";

const Note: React.FC<NoteProps> = ({
	id,
	category,
	archived,
	text,
	createdAt,
	deleteNote,
	editNote,
}) => {
	const [isModalOpen, setIsModalOpen] = useState({ edit: false, delete: false });

	const openModal = (mode: string) =>
		setIsModalOpen((prev) => {
			return { ...prev, [mode]: true };
		});
	const closeModal = (mode: string) =>
		setIsModalOpen((prev) => {
			return { ...prev, [mode]: false };
		});
	const handleDelete = () => {
		if (deleteNote) {
			deleteNote();
		}
	};

	const handleEdit = () => {
		if (editNote) {
			editNote();
		}
	};
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
					<button className='btn-secondary' onClick={() => openModal("delete")}>
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
				<div className='flex justify-end mt-2'>
					<span className='text-xs text-gray-500'>{createdAt}</span>
				</div>
			</div>
			<ConfirmDeleteModal
				isOpen={isModalOpen.delete}
				onClose={() => closeModal("delete")}
				deleteFn={handleDelete}
			/>
			<EditNoteModal
				isOpen={isModalOpen.edit}
				onClose={() => closeModal("edit")}
				NoteData={{ id, category, archived, text, createdAt, deleteNote }}
				onNoteEdit={handleEdit}
			/>
		</>
	);
};

export default Note;
