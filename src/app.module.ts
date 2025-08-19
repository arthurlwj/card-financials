import { Module } from '@nestjs/common';
import { typeOrmConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesModule } from './expenses/expenses.module';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ExpensesModule],
  controllers: [],
  providers: [],
})
export class AppModule {}
