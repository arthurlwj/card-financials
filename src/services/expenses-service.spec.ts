import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expenses.service';
import { ExpenseRepository } from 'src/repositories/expense.repository';
import { TypeOfSpending } from 'src/enums/type-of-spending.enum';

describe('ExpensesService', () => {
  let service: ExpensesService;
  let repo: jest.Mocked<ExpenseRepository>;

  const mockList = [
    {
      id: '1',
      description: 'Teste Mockado',
      amount: 1000,
      type: TypeOfSpending.FIXED,
      referenceMonth: '2025-08-01',
    },
    {
      id: '2',
      description: 'Teste Mockado 2',
      amount: 250.5,
      type: TypeOfSpending.VARIABLE,
      referenceMonth: '2025-08-01',
    },
  ];

  beforeEach(async () => {
    const repoMock: jest.Mocked<ExpenseRepository> = {
      filterExpenses: jest.fn().mockResolvedValue(mockList as any),
      expensesList: jest.fn(),
      createOne: jest.fn(),
      expenseListById: jest.fn(),
      expensesUpdateById: jest.fn(),
      expensesDelete: jest.fn(),
    } as any;

    const module: TestingModule = await Test.createTestingModule({
      providers: [
        ExpensesService,
        { provide: ExpenseRepository, useValue: repoMock },
      ],
    }).compile();

    service = module.get(ExpensesService);
    repo = module.get(ExpenseRepository);
  });

  it('should return expenses from repository', async () => {
    const filterDto = { type: TypeOfSpending.VARIABLE };
    const result = await service.expenseFilter(filterDto);

    expect(repo.filterExpenses).toHaveBeenCalledTimes(1);
    expect(repo.filterExpenses).toHaveBeenCalledWith(filterDto);
    expect(result).toEqual(mockList);
  });

  it('should propagate repository errors', async () => {
    repo.filterExpenses.mockRejectedValueOnce(new Error('Query failed'));
    await expect(service.expenseFilter({})).rejects.toThrow('Query failed');
  });
});
