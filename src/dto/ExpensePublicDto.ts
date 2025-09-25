import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsInt, IsOptional, IsPositive } from "class-validator";
import { TypeOfSpending } from "src/enums/type-of-spending.enum"
import { InstallmentPublicDto } from "./installmentPublicDto";
import { Expose, Type } from "class-transformer";


export class ExpensePublicDto {

    @Expose()
    cardId?: string;

    @ApiProperty({ example: 'Cartão Nubank' })
    @Expose()
    description: string;

    @ApiProperty({ example: 120.87 })
    @Expose()
    amount: number;

    @ApiProperty({ enum: TypeOfSpending, enumName: 'TypeOfSpending' })
    @Expose()
    type: TypeOfSpending;

    @IsOptional()
    @IsDateString({}, { message: 'firstInstallmentDate deve estar no formato YYYY-MM-DD' })
    firstInstallmentDate?: Date;
    
    @IsOptional()
    @IsInt()
    @IsPositive()
    quantityInstallments?: number;

    @IsOptional()
    @ApiProperty({ example: '2025-08-01', description: 'Primeiro dia do mês de referência' })
    @Expose()
    referenceMonth?: string;

    @Expose()
    @Type(() => InstallmentPublicDto)
    installments?: InstallmentPublicDto[];
}