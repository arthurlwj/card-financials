import { IsEnum, IsNotEmpty, IsOptional, IsPositive, IsString, Matches } from 'class-validator';
import { TypeOfSpending } from '../enums/type-of-spending.enum';
import { ApiProperty, ApiPropertyOptional } from '@nestjs/swagger';


export class UpdateExpensesDto {

    @IsString() @IsNotEmpty() @IsOptional()
    @ApiProperty({ example: 'Cartão Nubank', maxLength: 120 })
    description: string;

    @IsPositive() @IsOptional()
    @ApiProperty({ example: 120.87 })
    amount: number;

    @IsEnum(TypeOfSpending) @IsOptional()
    @ApiProperty({ enum: ['FIXED', 'VARIABLE'] })
    type: TypeOfSpending;

    @IsOptional()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, { message: 'referenceMonth deve estar no formato YYYY-MM-DD' })
    @ApiPropertyOptional({ example: '2025-08-23', description: 'Será normalizado para YYYY-MM-01' })
    referenceMonth?: string
}