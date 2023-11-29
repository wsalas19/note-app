import { EditNoteProp, PostNoteError } from "./types";

export const getNotes = async () => {
	const response = await fetch("http://localhost:3000/notes");
	const notes = await response.json();
	return notes;
};

export const postNote = async (noteData: EditNoteProp) => {
	try {
		const response = await fetch("http://localhost:3000/notes", {
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
