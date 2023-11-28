import React, { createContext, useState, ReactNode } from "react";
import { FilterOption, NoteProps } from "@/utils/types";

// Define the shape of the context
type NotesContextType = {
	notes: NoteProps[];
	addNote: (newNote: { category: string; text: string; archived: boolean }) => void;
	deleteNote: (id: number) => void;
	updateNote: (id: number, updatedNote: NoteProps) => void;
	filterArchived: (criteria: FilterOption) => void;
};

// Create the context
export const NotesContext = createContext<NotesContextType | undefined>(undefined);

// Create a provider component
type NotesProviderProps = {
	children: ReactNode;
};

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
	let noteData: NoteProps[] = [
		{
			id: 1,
			category: "generic",
			archived: true,
			text: "Lorem ipsum dolor, sit amet consectetur adipisicing elit. Modi quo praesentium veniam eveniet quas quibusdam recusandae dolorum inventore dicta illum dolorem dolor, iste animi sequi nihil cupiditate tempora ab repudiandae consectetur totam. Ab eligendi, consequuntur deleniti error consectetur officiis eaque?",
			createdAt: "2023-01-01",
		},
		{
			id: 2,
			category: "generic",
			archived: false,
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			createdAt: "2023-01-01",
		},
		{
			id: 3,
			category: "generic",
			archived: true,
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			createdAt: "2023-01-01",
		},
		{
			id: 4,
			category: "generic",
			archived: false,
			text: " Lorem ipsum dolor sit amet consectetur adipisicing elit. Error nulla exercitationem ducimus?",
			createdAt: "2023-01-01",
		},
		{
			id: 5,
			category: "generic",
			archived: false,
			text: "Lorem ipsum dolor sit amet, consectetur adipiscing elit.",
			createdAt: "2023-01-01",
		},
	];

	const [notes, setNotes] = useState<NoteProps[]>(noteData);

	const addNote = (newNote: { category: string; text: string; archived: boolean }) => {
		const newNoteWithId: NoteProps = {
			id: Math.random(),
			createdAt: new Date().toISOString(),
			...newNote,
		};
		noteData.push(newNoteWithId);
		setNotes((prevNotes: NoteProps[]) => [...prevNotes, newNoteWithId]);
	};

	const deleteNote = (id: number) => {
		const rootDelete = noteData.filter((note) => note.id !== id);
		const currentDelete = notes.filter((note) => note.id !== id);
		setNotes(currentDelete);
		noteData = rootDelete;
	};

	const updateNote = (id: number, updatedNote: NoteProps) => {
		setNotes((prevNotes) => prevNotes.map((note) => (note.id === id ? updatedNote : note)));
	};

	/*  const updateNote = (id: number, data: NoteProps) => {
		let noteSearch = notes.find((note) => note.id === id);
		noteSearch = {
			...noteSearch,
			...data,
		};
		noteData = noteData.filter((note) => note.id !== id);
		noteData.push(noteSearch);
		setNotes(noteData);
	}; */

	const filterArchived = (criteria: FilterOption) => {
		if (criteria === "archived") {
			setNotes(noteData.filter((note) => note.archived === true));
		} else if (criteria === "unarchived") {
			setNotes(noteData.filter((note) => note.archived === false));
		} else {
			setNotes(noteData);
		}
	};

	const contextValue: NotesContextType = {
		notes,
		addNote,
		deleteNote,
		updateNote,
		filterArchived,
	};

	return <NotesContext.Provider value={contextValue}>{children}</NotesContext.Provider>;
};
