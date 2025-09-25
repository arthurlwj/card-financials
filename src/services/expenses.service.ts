import { Injectable, NotFoundException } from "@nestjs/common";
import { plainToInstance } from "class-transformer";
import { ExpensePublicDto } from "src/dto/ExpensePublicDto";
import { CreateExpenseDto, UpdateExpensesDto } from "src/dto/ExpensesDto";
import { Installments } from "src/expenses/installment.entity";
import { ExpenseCreditCardRepository } from "src/repositories/card.repository";
import { ExpenseRepository } from "src/repositories/expense.repository";
import { toPublic } from "src/utils/retornoPropriedades";


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

        if (dto.quantityInstallments > 1) {
            const installments: Installments[] = []
            for (let i = 1; i <= dto.quantityInstallments; i++) {
                const installmentValue = dto.amount / dto.quantityInstallments;
                const dueDay = new Date(dto.firstInstallmentDate);
                dueDay.setMonth(dueDay.getMonth() + (i - 1));

                const installment = new Installments();
                installment.installmentNumber = i;
                installment.installmentValue = installmentValue;
                installment.dueDay = dueDay;
                installment.expense = expense;

                installments.push(installment)
            }
            expense.installments = installments

        }

        const savedExpense = await this.serviceRepo.save(expense)

        return plainToInstance(ExpensePublicDto, savedExpense, {
            excludeExtraneousValues: true,
        });

    }

    async listAllExpenses(): Promise<ExpensePublicDto[]> {
        const expense = await this.serviceRepo.expensesList();

        return expense.map((expense) => ({
            id: expense.id,
            cardId: expense.card ? expense.card.id : undefined,
            description: expense.description,
            amount: expense.amount,
            type: expense.type,
            firstInstallmentDate: expense.firstInstallmentDate,
            quantityInstallments: expense.quantityInstallments,
        }));

    }

    async expenseListById(id: string) {
        const findById = await this.serviceRepo.expenseListById(id);

        if (!findById) {
            throw new NotFoundException('Gasto não encontrado')
        }

        return findById
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