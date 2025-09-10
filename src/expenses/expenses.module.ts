import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Expenses } from './expenses.entity';
import { ExpensesController } from 'src/controller/expensesController';
import { ExpenseRepository } from 'src/repositories/expense.repository';
import { ExpensesService } from 'src/services/expensesService';

@Module({
    imports: [TypeOrmModule.forFeature([Expenses])],
    controllers: [ExpensesController],
    providers: [ExpenseRepository, ExpensesService],
})
export class ExpensesModule {}
