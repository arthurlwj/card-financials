import { TypeOfSpending } from "src/enums/type-of-spending.enum";
import { IsDateString, IsDefined, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Matches, MaxLength } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PartialType } from "@nestjs/mapped-types";



export class CreateExpenseDto {
    @IsOptional()
    cardId: string;

    @IsDefined({ message: 'description is required' })
    @IsString({ message: 'description must be a string' })
    @IsNotEmpty({ message: 'description must not be empty' })
    @MaxLength(120, { message: 'description must be <= 120' })
    @ApiProperty({ example: 'Nubank Card', maxLength: 120 })
    description: string;

    @IsDefined({ message: 'amount is required' })
    @IsPositive({ message: 'amount must be > 0' })
    @ApiProperty({ example: 120.87 })
    amount: number;

    @IsDefined({ message: 'type is required' })
    @IsEnum(TypeOfSpending)
    @ApiProperty({ enum: TypeOfSpending, enumName: 'TypeOßfSpending' })
    type: TypeOfSpending;

    @IsOptional()
    @IsDateString({}, { message: 'firstInstallmentDate deve estar no formato YYYY-MM-DD' })
    firstInstallmentDate: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    quantityInstallments: number;

    @IsOptional()
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, { message: 'referenceMonth deve estar no formato YYYY-MM-DD' })
    @ApiPropertyOptional({ example: '2025-08-23', description: 'Será normalizado para YYYY-MM-01' })
    referenceMonth?: string
}

export class UpdateExpensesDto extends PartialType(CreateExpenseDto) { }