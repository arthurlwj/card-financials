import { ArgumentsHost, Catch, ExceptionFilter, HttpException, HttpStatus } from '@nestjs/common';
import { Request, Response } from 'express';


@Catch(HttpException)

export class HttpExceptionFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost) {
        const ctx = host.switchToHttp();
        const res = ctx.getResponse<Response>();
        const req = ctx.getRequest<Request>();

        if (exception instanceof HttpException) {
            const status = exception.getStatus();
            const payload = exception.getResponse() as any;
            const message = payload?.message ?? exception.message;

            return res.status(status).json({
                statusCode: status,
                error: payload?.error ?? HttpStatus[status],
                message,
                path: req.originalUrl,
                method: req.method,
                timestamp: new Date().toISOString(),
            });
        }

        return res.status(HttpStatus.INTERNAL_SERVER_ERROR).json({
            statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
            error: 'Internal Server Error',
            message: 'Unexpected error',
            path: req.originalUrl,
            method: req.method,
            timestamp: new Date().toISOString(),
        })

    }
}