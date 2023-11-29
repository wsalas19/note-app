import React, { createContext, useState, ReactNode, useEffect } from "react";
import { EditNoteProp, FilterOption, NoteProps } from "@/utils/types";
import { UseMutationResult, useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getNotes, postNote, putNote, removeNote } from "./apiService";

type UpdateNoteProps = {
	id: number;
	noteData: EditNoteProp;
};

type NotesContextType = {
	notes: NoteProps[];
	setNotes: React.Dispatch<React.SetStateAction<NoteProps[]>>;
	addNote: UseMutationResult<unknown, Error, EditNoteProp, unknown>;
	deleteNote: UseMutationResult<unknown, Error, number, unknown>;
	updateNote: UseMutationResult<unknown, Error, UpdateNoteProps, unknown>;
	filterArchived: (criteria: FilterOption) => void;
	isLoading: boolean;
};
export const NotesContext = createContext<NotesContextType | undefined>(undefined);

type NotesProviderProps = {
	children: ReactNode;
};

export const NotesProvider: React.FC<NotesProviderProps> = ({ children }) => {
	const { data: noteData, isLoading } = useQuery({ queryKey: ["notes"], queryFn: getNotes });
	const queryClient = useQueryClient();
	const refetch = () => {
		queryClient.invalidateQueries({ queryKey: ["notes"] });
	};

	const [notes, setNotes] = useState<NoteProps[]>([]);

	useEffect(() => {
		if (noteData) {
			const sortedNotes = [...noteData].sort((a, b) => a.id - b.id);
			setNotes(sortedNotes);
		}
	}, [noteData]);

	const addNote: UseMutationResult<unknown, Error, EditNoteProp, unknown> = useMutation({
		mutationFn: postNote,
		onSuccess: () => {
			refetch();
		},
	});
	const deleteNote: UseMutationResult<unknown, Error, number, unknown> = useMutation({
		mutationFn: removeNote,
		onSuccess: () => {
			refetch();
		},
	});

	const updateNote: UseMutationResult<unknown, Error, UpdateNoteProps, unknown> = useMutation({
		mutationFn: (variables: UpdateNoteProps) => putNote(variables.id, variables.noteData),
		onSuccess: () => {
			refetch();
		},
	});
	/* const deleteNote = (id: number) => {
		const currentDelete = notes.filter((note) => note.id !== id);
		setNotes(currentDelete);
	}; */

	/* const updateNote = (id: number, updatedNote: NoteProps) => {
		setNotes((prevNotes) => prevNotes.map((note) => (note.id === id ? updatedNote : note)));
	}; */

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

	/* const addNote = (newNote: { category: string; text: string; archived: boolean }) => {
		const newNoteWithId: NoteProps = {
			id: Math.random(),
			createdAt: new Date().toISOString(),
			...newNote,
		};

		setNotes((prevNotes) => [...prevNotes, newNoteWithId]);
	}; */

	const filterArchived = (criteria: FilterOption) => {
		if (criteria === "archived") {
			setNotes(noteData.filter((note: NoteProps) => note.archived === true));
		} else if (criteria === "unarchived") {
			setNotes(noteData.filter((note: NoteProps) => note.archived === false));
		} else {
			setNotes(noteData);
		}
	};

	const contextValue: NotesContextType = {
		notes,
		setNotes,
		addNote,
		deleteNote,
		updateNote,
		filterArchived,
		isLoading,
	};

	return <NotesContext.Provider value={contextValue}>{children}</NotesContext.Provider>;
};
