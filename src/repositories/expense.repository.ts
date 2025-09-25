import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { UpdateExpensesDto } from "src/dto/ExpensesDto";
import { Expenses } from "src/expenses/expenses.entity";
import { mapPostgresError } from "src/utils/postgres-error.utils";
import { DeepPartial, Repository } from "typeorm";


@Injectable()
export class ExpenseRepository {
    constructor(
        @InjectRepository(Expenses)
        private readonly repo: Repository<Expenses>
    ) { }

    async create(data: DeepPartial<Expenses>): Promise<Expenses> {

        try {
            return this.repo.create(data);
        } catch (e) {
            throw mapPostgresError(e) ?? e;
        }
    }

    async save(expense: Expenses): Promise<Expenses> {
        return this.repo.save(expense);
    }

    async expensesList(): Promise<Expenses[]> {
        return this.repo.find({ relations: ['card'] });
    }

    async expenseListById(id: string): Promise<Expenses | null> {
        return this.repo.findOne({ where: { id } })
    }

    async expensesUpdateById(id: string, data: UpdateExpensesDto) {

        try {
            return this.repo.update({ id }, data);
        } catch (e) {
            throw mapPostgresError(e) ?? e;
        }

    }

    async expensesDelete(id: string) {
        try {
            return this.repo.delete(id);
        } catch (e) {
            throw mapPostgresError(e) ?? e;
        }
    }
}