import { PartialType } from "@nestjs/mapped-types";
import { CreateNoteDto } from "./create-note.dto";

export class UpdateNoteDto extends PartialType(CreateNoteDto) {
	text: string;
	archived: boolean;
	category: string;
}
