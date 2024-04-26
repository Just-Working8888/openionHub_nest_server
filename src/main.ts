import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { DocumentBuilder, SwaggerModule } from "@nestjs/swagger";
import { JwtAuthCuard } from "./auth/jwt-auth.guard";


async function start() {
    const PORT = process.env.PORT || 4000;
    const app = await NestFactory.create(AppModule)

    const config = new DocumentBuilder()
        .setTitle('Test Backend')
        .setDescription('testing backend for testing')
        .setVersion('1.0.0')
        .addTag('Just Work')
        .build();

    const document = SwaggerModule.createDocument(app, config)
    SwaggerModule.setup('/api/swagger', app, document)
    // app.useGlobalGuards(JwtAuthCuard)

    await app.listen(PORT, () => console.log(`Server started at ${PORT}`));
}
start();