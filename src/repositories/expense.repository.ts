import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { ExpensePublicDto } from "src/dto/ExpensePublicDto";
import { CreateExpenseDto, UpdateExpensesDto } from "src/dto/ExpensesDto";
import { Expenses } from "src/expenses/expenses.entity";
import { mapPostgresError } from "src/utils/postgres-error.utils";
import { Repository } from "typeorm";


@Injectable()
export class ExpenseRepository {
    constructor(
        @InjectRepository(Expenses)
        private readonly repo: Repository<Expenses>
    ) { }

    async createOne(data: Partial<CreateExpenseDto>) {
        const expense = this.repo.create(data);

        try {
            return await this.repo.save(expense);
        } catch (e) {
            mapPostgresError(e);
        }
    }

    async expensesList(): Promise<Expenses[]> {
        return this.repo.find();
    }

    async expenseListById(id: string): Promise<Expenses | null> {
        return this.repo.findOne({ where: { id } })
    }

    async expensesUpdateById(id: string, data: UpdateExpensesDto) {
        return this.repo.update({ id }, data)

    }

    async expensesDelete(id: string) {
        return this.repo.delete(id)
    }
}