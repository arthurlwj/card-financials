import { ApiProperty } from "@nestjs/swagger";
import { TypeOfSpending } from "src/enums/type-of-spending.enum"


export class ExpensePublicDto {

    @ApiProperty({ example: 'Cartão Nubank' })
    description: string;

    @ApiProperty({ example: 120.87 })
    amount: number;

    @ApiProperty({ enum: ['FIXED', 'VARIABLE'] })
    type: TypeOfSpending;

    @ApiProperty({ example: '2025-08-01', description: 'Primeiro dia do mês de referência' })
    referenceMonth: string;
}