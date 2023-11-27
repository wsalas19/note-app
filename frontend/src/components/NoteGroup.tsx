import React from "react";
import { NoteProps } from "../utils/types"; // Adjust the import path as needed
import Note from "./Note";

const NoteGroup: React.FC<{ notes: NoteProps[]; deleteNote: (id: number) => void }> = ({
	notes,
	deleteNote,
}) => {
	if (notes.length === 0)
		return (
			<div>
				<p className='text-center font-bold text-gray-500 text-3xl'>No notes yet.</p>
			</div>
		);

	return (
		<>
			<div className='flex flex-col gap-4 p-4 lg:flex-row lg:flex-wrap lg:justify-start'>
				{notes.map((note) => (
					<Note deleteNote={() => deleteNote(note.id)} key={note.id} {...note} />
				))}
			</div>
		</>
	);
};

export default NoteGroup;
