import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateExpenseDto } from "src/dto/CreateExpenseDto";
import { ExpensePublicDto } from "src/dto/ExpensePublicDto";
import { Expenses } from "src/expenses/expenses.entity";
import { Repository } from "typeorm";


@Injectable()
export class ExpenseRepository {
    constructor(
        @InjectRepository(Expenses)
        private readonly repo: Repository<Expenses>
    ) { }

    async createOne(data: Partial<Expenses>) {
        const expense = this.repo.create(data);

        return await this.repo.save(expense);
    }

    async expensesList(): Promise<ExpensePublicDto[]> {
        const listExpenses = this.repo.find();
        return listExpenses
    }

    async expenseListById(id: string): Promise<Expenses | null> {
        const findById = this.repo.findOne({ where: { id } })
        return await findById
    }

    async expensesUpdateById(id: string, data: Partial<Expenses>) {
        const updateExpenses = this.repo.update({id}, data)
        return await updateExpenses
    }

    async expensesDelete(id: string){
        return this.repo.delete(id)
    }
}