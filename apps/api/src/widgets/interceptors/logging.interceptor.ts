import {
  Injectable,
  NestInterceptor,
  ExecutionContext,
  CallHandler,
  Logger,
} from '@nestjs/common';
import { Observable, throwError } from 'rxjs';
import { tap, catchError } from 'rxjs/operators';
import * as Sentry from '@sentry/node';

@Injectable()
export class LoggingInterceptor implements NestInterceptor {
  private readonly logger = new Logger(LoggingInterceptor.name);

  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    const request = context.switchToHttp().getRequest();
    const { method, url, body } = request;
    const now = Date.now();

    // Log request
    this.logger.log(`[${method}] ${url} - Request started`);
    Sentry.addBreadcrumb({
      message: `API Request: ${method} ${url}`,
      level: 'info',
      data: { body },
    });

    return next.handle().pipe(
      tap((data) => {
        const response = context.switchToHttp().getResponse();
        const { statusCode } = response;
        const responseTime = Date.now() - now;

        // Log successful response
        this.logger.log(
          `[${method}] ${url} - ${statusCode} - ${responseTime}ms`
        );
        
        Sentry.addBreadcrumb({
          message: `API Response: ${method} ${url} - ${statusCode}`,
          level: 'info',
          data: { responseTime, statusCode },
        });
      }),
      catchError((error) => {
        const response = context.switchToHttp().getResponse();
        const responseTime = Date.now() - now;

        // Log error
        this.logger.error(
          `[${method}] ${url} - ${error.status || 500} - ${responseTime}ms - ${error.message}`
        );

        // Send error to Sentry
        Sentry.captureException(error, {
          tags: {
            method,
            url,
            responseTime,
          },
          extra: {
            body,
            stack: error.stack,
          },
        });

        return throwError(() => error);
      })
    );
  }
}