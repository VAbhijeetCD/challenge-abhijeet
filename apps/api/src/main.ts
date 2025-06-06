import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import * as Sentry from '@sentry/node';

async function bootstrap() {
  // Initialize Sentry (mock configuration)
  Sentry.init({
    dsn: 'https://mock-dsn@sentry.io/mock-project', // Mock DSN
    environment: process.env.NODE_ENV || 'development',
    beforeSend(event) {
      // In development, just log instead of sending to Sentry
      console.log('[Sentry Mock]', event);
      return null; // Don't actually send in mock mode
    },
  });

  const app = await NestFactory.create(AppModule);
  
  // Enable CORS for the web app
  app.enableCors({
    origin: 'http://localhost:3000',
    methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],
    credentials: true,
  });
  
  await app.listen(3001);
}
bootstrap();
