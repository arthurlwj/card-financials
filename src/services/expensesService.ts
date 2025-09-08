import { Injectable, NotFoundException } from "@nestjs/common";
import { ExpensePublicDto } from "src/dto/ExpensePublicDto";
import { UpdateExpensesDto } from "src/dto/ExpensesDto";
import { TypeOfSpending } from "src/enums/type-of-spending.enum";
import { ExpenseRepository } from "src/repositories/expense.repository";
import toPublic from "src/utils/retornoPropriedades";


@Injectable()
export class ExpensesService {
    constructor(
        private readonly serviceRepo: ExpenseRepository
    ) { }

    async create(data: {
        description: string;
        amount: number;
        type: TypeOfSpending;
        referenceMonth?: string;
    }) {

        const createdExpense = await this.serviceRepo.createOne({
            description: data.description,
            amount: data.amount,
            type: data.type,

        })

        return {
            description: createdExpense.description,
            amount: createdExpense.amount,
            type: createdExpense.type,
            referenceMonth: createdExpense.referenceMonth,
        }


    }

    async listAllExpenses() {
       return await this.serviceRepo.expensesList();
    }

    async expenseListById(id: string) {
        const findById = await this.serviceRepo.expenseListById(id);

        if (!findById) {
            throw new NotFoundException('Gasto não encontrado')
        }

        return findById;
    }

    async expensesUpdate(id: string, dto: UpdateExpensesDto) {
        const updateResult = await this.serviceRepo.expensesUpdateById(id, dto);

        if (!updateResult.affected) {
            throw new NotFoundException('Gasto não encontrado')
        }

        const updateExpenses = await this.serviceRepo.expenseListById(id);

        return toPublic(updateExpenses)
    }

    async expensesDelete(id: string){
        const deleteResult = await this.serviceRepo.expensesDelete(id)

        if(deleteResult.affected === 0){
            throw new NotFoundException('Gasto não encontrado')
        }

        return { message: 'Gasto removido com sucesso' };
    }
}