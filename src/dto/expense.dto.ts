import { TypeOfSpending } from "src/enums/type-of-spending.enum";
import { IsDate, IsDateString, IsDefined, IsEnum, IsInt, IsNotEmpty, IsOptional, IsPositive, IsString, Matches, MaxLength, ValidateIf } from 'class-validator'
import { ApiProperty, ApiPropertyOptional } from "@nestjs/swagger";
import { PartialType } from "@nestjs/mapped-types";
import { Type } from "class-transformer";



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

    @ValidateIf((o) => o.quantityInstallments > 1)
    @IsNotEmpty({ message: 'firstInstallmentDate is required when quantityInstallments is greater than 1' })
    @IsDateString({}, { message: 'firstInstallmentDate must be a valid ISO date string' })
    @IsOptional()
    @IsDateString({}, { message: 'firstInstallmentDate must be in YYYY-MM-DD format' })
    firstInstallmentDate: string;

    @IsOptional()
    @IsInt()
    @IsPositive()
    quantityInstallments?: number;

    @IsOptional()
    @IsDate()
    @Type(() => Date)
    @Matches(/^\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[12]\d|3[01])$/, { message: 'firstInstallmentDate must be in YYYY-MM-DD format' })
    @ApiPropertyOptional({ example: '2025-08-23', description: 'It will be normalized to YYYY-MM-01' })
    referenceMonth?: Date;

    @IsOptional()
    @IsInt()
    @IsPositive()
    installmentNumber?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    totalInstallments?: number;
}

export class UpdateExpensesDto extends PartialType(CreateExpenseDto) { }