import { BadRequestException, ConflictException } from "@nestjs/common";
import { QueryFailedError } from "typeorm";
import { getPgCode, getPgConstraint } from "./postgres-error";

export function mapPostgresError(e: unknown) {
    if (!(e instanceof QueryFailedError)) return null;

    const code = getPgCode(e)
    switch (code) {
        case '23505':
            return new ConflictException({
                error: 'Conflict',
                code: 'UNIQUE_VIOLATION',
                message: 'Resource already exists',
                constraint: getPgConstraint(e),
            });

        case '23503':
            return new BadRequestException({
                error: 'Bad request',
                code: 'FK_VIOLATION',
                message: 'Invalid reference (foreign key)'
            });

        case '22P02':
            return new BadRequestException({
                error: 'Bad request',
                code: 'INVALID_FORMAT',
                message: 'Invalid value format'
            });

        case '23502':
            return new BadRequestException({
                error: 'Bad Request',
                code: 'NOT_NULL_VIOLATION',
                message: 'Missing required value'
            });

            default:
                return null;
    }
}