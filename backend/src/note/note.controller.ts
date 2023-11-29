import { Controller, Get, Post, Body, Param, Delete, Put } from "@nestjs/common";
import { NoteService } from "./note.service";
import { CreateNoteDto } from "./dto/create-note.dto";
import { UpdateNoteDto } from "./dto/update-note.dto";

@Controller("notes")
export class NoteController {
	constructor(private readonly noteService: NoteService) {}

	@Post()
	create(@Body() createNoteDto: CreateNoteDto) {
		return this.noteService.create(createNoteDto);
	}

	@Get()
	findAll() {
		return this.noteService.findAll();
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.noteService.findOne(+id);
	}

	@Put(":id")
	update(@Param("id") id: string, @Body() updateNoteDto: UpdateNoteDto) {
		return this.noteService.update(+id, updateNoteDto);
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.noteService.remove(+id);
	}
}
