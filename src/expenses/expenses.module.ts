import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expenses } from './expenses.entity';
import { expensesController } from 'src/controller/expensesController';
import { ExpenseRepository } from 'src/repositories/expense.repository';
import { ExpensesService } from 'src/services/expensesService';

@Module({
    imports: [TypeOrmModule.forFeature([Expenses])],
    controllers: [expensesController],
    providers: [ExpenseRepository, ExpensesService],
})
export class ExpensesModule {}
