import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExpensePublicDto } from "src/dto/ExpensePublicDto";
import { TypeOfSpending } from "src/enums/type-of-spending.enum";
import { Expenses } from "src/expenses/expenses.entity";
import { ExpenseRepository } from "src/repositories/expense.repository";


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

        return createdExpense;


    }

    async listAllExpenses(): Promise<ExpensePublicDto[]> {
        const listAllExpenses = await this.serviceRepo.expensesList();
        return listAllExpenses.map(filterSomeItems => ({
                description: filterSomeItems.description,
                amount: filterSomeItems.amount,
                type: filterSomeItems.type,
                referenceMonth: filterSomeItems.referenceMonth

        }))
    }

    async expenseListById(id: string) {
        const findById = await this.serviceRepo.expenseListById(id);

        if (!findById) {
            throw new NotFoundException('Gasto não encontrado')
        }

        return findById;
    }

    async expensesUpdate(id: string, data: {
        description: string;
        amount: number;
        type: TypeOfSpending;
        referenceMonth?: string;
    }) {
        const updateResult = await this.serviceRepo.expensesUpdateById(id, data);

        if (updateResult.affected === 0) {
            throw new NotFoundException('Gasto não encontrado')
        }

        const updateExpenses = await this.serviceRepo.expenseListById(id);

        return updateExpenses
    }

    async expensesDelete(id: string){
        const deleteResult = await this.serviceRepo.expensesDelete(id)

        if(deleteResult.affected === 0){
            throw new NotFoundException('Gasto não encontrado')
        }

        return { message: 'Gasto removido com sucesso' };
    }
}