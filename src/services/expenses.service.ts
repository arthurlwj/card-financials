import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ExpensePublicDto } from "src/dto/ExpensePublicDto";
import { CreateExpenseDto, UpdateExpensesDto } from "src/dto/ExpensesDto";
import { FilterExpenseDto } from "src/dto/filter-expenseDto";
import { Expenses } from "src/expenses/expenses.entity";
import { ExpenseCreditCardRepository } from "src/repositories/card.repository";
import { ExpenseRepository } from "src/repositories/expense.repository";
import { toPublic } from "src/utils/retornoPropriedades";
import { DeepPartial } from "typeorm";


@Injectable()
export class ExpensesService {
    constructor(
        private readonly serviceRepo: ExpenseRepository,
        private readonly cardsRepository: ExpenseCreditCardRepository,
    ) { }

    async create(dto: CreateExpenseDto): Promise<ExpensePublicDto> {

        const { cardId, ...expensesData } = dto

        const expense = await this.serviceRepo.create(expensesData);

        if (dto.cardId) {
            const card = await this.cardsRepository.cardListById(cardId)
            if (!card) throw new NotFoundException('Card not found');
            expense.card = card;
        };

        if (!dto.quantityInstallments || dto.quantityInstallments === 1) {
            expense.installmentNumber = 1;
            expense.totalInstallments = 1;
        }

        if (dto.quantityInstallments > 1) {
            const expenseArray: DeepPartial<Expenses>[] = []
            for (let i = 1; i <= dto.quantityInstallments; i++) {
                const installmentValue = dto.amount / dto.quantityInstallments;
                const dueDay = new Date(dto.firstInstallmentDate);
                dueDay.setMonth(dueDay.getMonth() + (i - 1));

                expenseArray.push({
                    card: expense.card,
                    description: expense.description,
                    amount: installmentValue,
                    type: expense.type,
                    referenceMonth: dueDay,
                });
            }
            const savedExpenses = await this.serviceRepo.save(expenseArray);

            return plainToInstance(ExpensePublicDto, savedExpenses, {
                excludeExtraneousValues: true,
            });
        };

        const savedExpenses = await this.serviceRepo.save(expense);

        return plainToInstance(ExpensePublicDto, savedExpenses, {
            excludeExtraneousValues: true,
        });
    }


    async expenseFilter(data: FilterExpenseDto): Promise<ExpensePublicDto[]> {
        const expenseFilter = await this.serviceRepo.filterExpenses(data);

        if (expenseFilter.length === 0) {
            throw new NotFoundException('Gasto não encontrado');

        }

        return expenseFilter.map(expense => plainToInstance(ExpensePublicDto, expense, {
            excludeExtraneousValues: true,
        }),
        );

    }

    async expensesUpdate(id: string, dto: UpdateExpensesDto) {
        const updateResult = await this.serviceRepo.expensesUpdateById(id, dto);

        if (!updateResult.affected) {
            throw new NotFoundException('Gasto não encontrado')
        }

        const updateExpenses = await this.serviceRepo.expenseListById(id);

        return toPublic(updateExpenses)
    }

    async expensesDelete(id: string) {
        const deleteResult = await this.serviceRepo.expensesDelete(id)

        if (deleteResult.affected === 0) {
            throw new NotFoundException('Gasto não encontrado')
        }

        return { message: 'Gasto removido com sucesso' };
    }
}