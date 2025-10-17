import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expenses } from './expenses.entity';
import { ExpensesController } from 'src/controller/expenses.controller';
import { ExpenseRepository } from 'src/repositories/expense.repository';
import { ExpensesService } from 'src/services/expenses.service';
import { ExpenseCreditCardController } from 'src/controller/card.controller';
import { ExpenseCreditCardRepository } from 'src/repositories/card.repository';
import { ExpenseCreditCardService } from 'src/services/card.service';
import { ExpensesCreditCard } from './card.entity';

@Module({
    imports: [TypeOrmModule.forFeature([Expenses, ExpensesCreditCard])],
    controllers: [ExpensesController, ExpenseCreditCardController],
    providers: [ExpenseRepository, ExpensesService, ExpenseCreditCardRepository, ExpenseCreditCardService],
})
export class ExpensesModule {}
