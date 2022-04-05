import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { GlobalExceptionHandling } from './common/filters/http-exception.filter';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);


  app.useGlobalFilters(new GlobalExceptionHandling());
  await app.listen(3000);
}
bootstrap();
