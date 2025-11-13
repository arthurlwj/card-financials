import { TypeOfSpending } from "src/enums/type-of-spending.enum";
import { IsEnum, IsOptional, IsPositive, IsString } from 'class-validator'


export class FilterExpenseDto {
    @IsOptional()
    cardId?: string;

    @IsOptional()
    @IsString()
    description?: string;

    @IsOptional()
    @IsPositive()
    amount?: number;

    @IsOptional()
    @IsEnum(TypeOfSpending)
    type?: TypeOfSpending;
}