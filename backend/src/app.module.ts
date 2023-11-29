import { Module } from "@nestjs/common";
import { AppController } from "./app.controller";
import { AppService } from "./app.service";
import { TypeOrmModule } from "@nestjs/typeorm";
import { NoteModule } from "./note/note.module";
import { ConfigModule } from "@nestjs/config";
import { Note } from "./note/entities/note.entity";
import { CategoryModule } from "./category/category.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		TypeOrmModule.forRoot({
			type: "postgres",
			host: process.env.PG_HOST,
			username: process.env.PG_USER,
			password: process.env.PG_PASS,
			database: process.env.PG_DB,
			entities: [Note],
			ssl: true,
			autoLoadEntities: true,
			synchronize: true,
		}),

		NoteModule,
		CategoryModule,
	],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
