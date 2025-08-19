import { TypeOfSpending } from "src/enums/type-of-spending.enum";
import { IsEnum, IsNotEmpty, IsOptional, IsPositive, IsString, Matches, MaxLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";



export class CreateExpenseDto {
    @IsString() @IsNotEmpty() @MaxLength(120)
    @ApiProperty({ example: 'Cartão Nubank', maxLength: 120 })
    description: string;
    @IsPositive()
    @ApiProperty({ example: 120.87 })
    amount: number;
    @IsEnum(TypeOfSpending)
    @ApiProperty({ enum: ['FIXED', 'VARIABLE'] })
    type: TypeOfSpending;
    @IsOptional()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, { message: 'referenceMonth deve estar no formato YYYY-MM-DD' })
    @ApiPropertyOptional({ example: '2025-08-23', description: 'Será normalizado para YYYY-MM-01' })
    referenceMonth?: string
}