export type FilterOption = "all" | "archived" | "unarchived";

export type NoteProps = {
	id: number;
	category: string;
	archived: boolean;
	text: string;
	createdAt: string; // Assuming createdAt is a string, adjust as needed
	deleteNote?: () => void;
};
export type DeleteModalProps = {
	isOpen: boolean;
	onClose: () => void;
	deleteFn: () => void;
};
export type NoteModalProps = {
	isOpen: boolean;
	onClose: () => void;
	onNoteCreate: (newNote: { category: string; text: string; archived: boolean }) => void;
};
