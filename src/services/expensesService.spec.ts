
import { Test, TestingModule } from '@nestjs/testing';
import { ExpensesService } from './expensesService';
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
            referenceMonth: '2025-08-01'
        },
        {
            id: '2',
            description: 'Teste Mockado 2',
            amount: 250.5,
            type: TypeOfSpending.VARIABLE,
            referenceMonth: '2025-08-01'
        },
    ];

    beforeEach(async () => {
        const repoMock: jest.Mocked<ExpenseRepository> = {
            expensesList: jest.fn().mockResolvedValue(mockList as any),
            createOne: jest.fn(),
            expenseListById: jest.fn(),
            expensesUpdateById: jest.fn(),
            expensesDelete: jest.fn(),
        } as any;

        const module: TestingModule = await Test.createTestingModule({
            providers: [
                ExpensesService,
                { provide: ExpenseRepository, useValue: repoMock }
            ],
        }).compile();
        service = module.get(ExpensesService)
        repo = module.get(ExpenseRepository)
    });

    it('should return expenses from repository', async () => {
        const result = await service.listAllExpenses();
        expect(repo.expensesList).toHaveBeenCalledTimes(1);
        expect(result).toEqual([
            {
                description: 'Teste Mockado',
                amount: 1000,
                type: TypeOfSpending.FIXED,
                referenceMonth: '2025-08-01',
            },
            {
                description: 'Teste Mockado 2',
                amount: 250.5,
                type: TypeOfSpending.VARIABLE,
                referenceMonth: '2025-08-01',
            },
        ]);
    });
    it('should propagate repository errors', async () => {
        repo.expensesList.mockRejectedValueOnce(new Error('Query failed'));
        await expect(service.listAllExpenses()).rejects.toThrow('Query failed');
    });
});