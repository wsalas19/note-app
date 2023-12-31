import { Entity, Column, PrimaryGeneratedColumn } from "typeorm";

@Entity()
export class Note {
	@PrimaryGeneratedColumn()
	id: number;

	@Column()
	text: string;

	@Column()
	category: string;

	@Column()
	archived: boolean;

	@Column()
	createdAt: Date;
}
