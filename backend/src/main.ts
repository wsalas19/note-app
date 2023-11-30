import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import * as cors from "cors";
async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.use(
		cors({
			origin: [
				"http://localhost:5173",
				"https://note-app-zeta-ten.vercel.app/",
				"https://note-app-api-inky.vercel.app/",
			],
		}),
	);
	await app.listen(3000);
}
bootstrap();
