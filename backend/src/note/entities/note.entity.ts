import { UUID } from "crypto";
import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
	@PrimaryGeneratedColumn()
	id: UUID;

	@Column()
	text: string;

	@Column()
	category: string;

	@Column()
	archived: boolean;

	@Column()
	createdAt: Date;
}
