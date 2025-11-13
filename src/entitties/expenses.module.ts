import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expenses } from './expenses.entity';
import { ExpensesController } from 'src/expenses/expenses.controller';
import { ExpenseRepository } from 'src/expenses/expense.repository';
import { ExpensesService } from 'src/expenses/expenses.service';
import { ExpenseCreditCardController } from 'src/cards/card.controller';
import { ExpenseCreditCardRepository } from 'src/cards/card.repository';
import { ExpenseCreditCardService } from 'src/cards/card.service';
import { Card } from './card.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Expenses, Card])],
    controllers: [ExpensesController, ExpenseCreditCardController],
    providers: [ExpenseRepository, ExpensesService, ExpenseCreditCardRepository, ExpenseCreditCardService],
})
export class ExpensesModule {}
