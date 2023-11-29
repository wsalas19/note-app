import { CreateNoteParam } from "./../utils/types";
import { Injectable } from "@nestjs/common";
import { UpdateNoteDto } from "./dto/update-note.dto";
import { InjectRepository } from "@nestjs/typeorm";
import { Note } from "./entities/note.entity";
import { Repository } from "typeorm";

@Injectable()
export class NoteService {
	constructor(@InjectRepository(Note) private noteRepository: Repository<Note>) {}
	create(createNoteDto: CreateNoteParam) {
		const newNote = this.noteRepository.create({ ...createNoteDto, createdAt: new Date() });
		return this.noteRepository.save(newNote);
	}

	findAll() {
		const allNotes = this.noteRepository.find();
		return allNotes;
	}

	findOne(id: number) {
		const noteSearch = this.noteRepository.findOne({ where: { id: id } });
		return noteSearch;
	}

	update(id: number, updateNoteDto: UpdateNoteDto) {
		const updatedNote = this.noteRepository.update(id, { ...updateNoteDto });
		return updatedNote;
	}

	remove(id: number) {
		const deteletedNote = this.noteRepository.delete(id);
		return deteletedNote;
	}
}
