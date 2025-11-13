import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ExpensePublicDto } from "src/expenses/dtos/expense-public.dto";
import { CreateExpenseDto, UpdateExpensesDto } from "src/expenses/dtos/expense.dto";
import { FilterExpenseDto } from "src/expenses/dtos/filter-expense.dto";
import { Expenses } from "src/entitties/expenses.entity";
import { ExpenseCreditCardRepository } from "src/cards/card.repository";
import { ExpenseRepository } from "src/expenses/expense.repository";
import { toPublic } from "src/utils/property-return";
import { DeepPartial } from "typeorm";
import { ExpenseCreditCardService } from "../cards/card.service";


@Injectable()
export class ExpensesService {
    constructor(
        private readonly serviceRepo: ExpenseRepository,
        private readonly cardsRepository: ExpenseCreditCardRepository,
        private readonly cardsService: ExpenseCreditCardService
    ) { }

    async create(dto: CreateExpenseDto): Promise<ExpensePublicDto> {

        const { cardId, ...expensesData } = dto

        const expense = await this.serviceRepo.create(expensesData);

        if (cardId) {
            const card = await this.cardsRepository.cardListById(cardId)
            if (!card) throw new NotFoundException('Card not found');
            expense.card = card;
        };

        if (!dto.quantityInstallments || dto.quantityInstallments === 1) {
            expense.installmentNumber = 1;
            expense.totalInstallments = 1;
        }

        if (dto.quantityInstallments > 1) {
            if (!dto.firstInstallmentDate) {
                throw new BadRequestException('firstInstallmentDate is required when creating multiple installments');
            }
            if (dto.cardId) {
                await this.cardsService.subtractFromAvailableLimit(cardId, dto.amount)
            }
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
                    installmentNumber: i,
                    totalInstallments: expense.quantityInstallments,
                    firstInstallmentDate: dto.firstInstallmentDate,
                    quantityInstallments: dto.quantityInstallments
                });
            }

            const savedExpenses = await this.serviceRepo.save(expenseArray);

            return plainToInstance(ExpensePublicDto, savedExpenses, {
                excludeExtraneousValues: true,
            });
        };

        if (dto.cardId) {
            await this.cardsService.subtractFromAvailableLimit(cardId, dto.amount)
        }

        const savedExpenses = await this.serviceRepo.save(expense);

        return plainToInstance(ExpensePublicDto, savedExpenses, {
            excludeExtraneousValues: true,
        });
    }


    async expenseFilter(data: FilterExpenseDto): Promise<ExpensePublicDto[]> {
        const expenseFilter = await this.serviceRepo.filterExpenses(data);

        if (expenseFilter.length === 0) {
            throw new NotFoundException('Expense not found');

        }

        return expenseFilter.map(expense => plainToInstance(ExpensePublicDto, expense, {
            excludeExtraneousValues: true,
        }),
        );

    }

    async expenseById(id: string) {
        const findById = await this.serviceRepo.expenseListById(id)

        if (!findById) throw new NotFoundException('Card not found')

        return findById
    }

    async expensesUpdate(id: string, dto: UpdateExpensesDto) {
        const updateResult = await this.serviceRepo.expensesUpdateById(id, dto);

        if (!updateResult.affected) {
            throw new NotFoundException('Expense not found')
        }

        const updateExpenses = await this.serviceRepo.expenseListById(id);

        return toPublic(updateExpenses)
    }

    async expensesDelete(id: string) {
        const expense = await this.serviceRepo.expenseListById(id)

        if (!expense) {
            throw new NotFoundException('Expense not found');
        }

        if (expense.card) {
            await this.cardsService.restoreFromAvailableLimit(expense.card.id, expense.amount)
        }

        const deleteResult = await this.serviceRepo.expensesDelete(id)

        if (deleteResult.affected === 0) {
            throw new NotFoundException('Expense not found')
        }

        return { message: 'Expense removed successfully' };
    }
}