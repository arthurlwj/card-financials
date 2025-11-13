import { Module } from '@nestjs/common';
import { typeOrmConfig } from './configs/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExpensesModule } from './entitties/expenses.module';
import { APP_FILTER } from '@nestjs/core';
import { HttpExceptionFilter } from './filters/not-found-exception.filter';


@Module({
  imports: [TypeOrmModule.forRoot(typeOrmConfig), ExpensesModule],
  controllers: [],
  providers: [
    {provide: APP_FILTER, useClass: HttpExceptionFilter}
  ],
})
export class AppModule {}
