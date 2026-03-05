import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv/config';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.enableCors({
    origin: [
      // 'http://localhost:3001',
      // 'https://prome-attendance-activity-backend-production-30cf.up.railway.app/',
      process.env.FRONTEND_URL, //Url FOR FRONTEND CONNECTION
    ].filter(Boolean),
    methods: ['GET', 'POST', 'PATCH', 'DELETE', 'OPTIONS'],
    credentials: true,
  });

  await app.listen(process.env.PORT ?? 3000);
}
bootstrap();
