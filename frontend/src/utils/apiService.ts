import { EditNoteProp, PostNoteError } from "./types";

const API_URL = import.meta.env.VITE_BASE_URL;

export const getNotes = async () => {
	const response = await fetch(API_URL);
	const notes = await response.json();
	return notes;
};

export const postNote = async (noteData: EditNoteProp) => {
	try {
		const response = await fetch(API_URL, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(noteData),
		});

		if (!response) {
			throw new Error(`HTTP error!`);
		}
		const success = await response.json();
		return success;
	} catch (error) {
		if (error instanceof PostNoteError) {
			throw error;
		} else {
			throw new PostNoteError("An unknown error occurred.");
		}
	}
};

export const removeNote = async (id: number) => {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "DELETE",
	});
	const success = await response.json();
	return success;
};

export const putNote = async (id: number, noteData: EditNoteProp) => {
	const response = await fetch(`${API_URL}/${id}`, {
		method: "PUT",
		headers: {
			"Content-Type": "application/json",
		},
		body: JSON.stringify(noteData),
	});
	const success = await response.json();
	return success;
};
