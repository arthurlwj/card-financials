import { ApiProperty } from "@nestjs/swagger";
import { IsDate, IsDateString, IsInt, IsOptional, IsPositive } from "class-validator";
import { TypeOfSpending } from "src/enums/type-of-spending.enum"
import { Expose, Transform, Type } from "class-transformer";


export class ExpensePublicDto {

    @Expose()
    @Type(() => String)
    @Transform(({ obj }) => obj.card?.id)
    cardId?: string;

    @Expose()
    id: string;

    @ApiProperty({ example: 'Nubank card' })
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
    @IsDate()
    @Type(() => Date)
    @ApiProperty({ example: '2025-08-01', description: 'First Day Reference Month' })
    @Expose()
    referenceMonth?: Date;

    @IsOptional()
    @IsInt()
    @IsPositive()
    @Expose()
    installmentNumber?: number;

    @IsOptional()
    @IsInt()
    @IsPositive()
    @Expose()
    totalInstallments?: number;
}
