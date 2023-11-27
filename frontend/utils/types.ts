export type FilterOption = "all" | "archived" | "unarchived";
export type NoteProps = {
	id: number;
	category: string;
	archived: boolean;
	text: string;
	createdAt: string; // Assuming createdAt is a string, adjust as needed
};
