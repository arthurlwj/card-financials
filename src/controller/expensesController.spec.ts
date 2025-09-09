
import { ExpensesController } from "./ExpensesController"
import { Expenses } from "src/expenses/expenses.entity";
import { Test, TestingModule } from '@nestjs/testing';
import { DeepPartial } from "typeorm";
import { TypeOfSpending } from "src/enums/type-of-spending.enum";
import { ExpensesService } from "src/services/expensesService";


describe('ExpensesController', () => {
    let controller: ExpensesController;
    let service: jest.Mocked<ExpensesService>;

    const mockExpenses: DeepPartial<Expenses>[] = [
        {
            id: '1',
            description: 'Teste Mock',
            amount: 1000,
            type: TypeOfSpending.FIXED,
            referenceMonth: '2025-08-01'
        },
        {
            id: '2',
            description: 'Teste Mock 2',
            amount: 250.5,
            type: TypeOfSpending.VARIABLE,
            referenceMonth: '2025-08-01'
        },
    ];

    beforeEach(async () => {
        const serviceMock = {
            listAllExpenses: jest.fn().mockResolvedValue(mockExpenses as unknown as Expenses[]),
        } as unknown as jest.Mocked<ExpensesService>;

        const module: TestingModule = await Test.createTestingModule({
            controllers: [ExpensesController],
            providers: [{ provide: ExpensesService, useValue: serviceMock }]
        }).compile();

        controller = module.get<ExpensesController>(ExpensesController)
        service = module.get(ExpensesService)
    });

    it('should return a list of expenses', async () => {
        const result = await controller.listExpenses();
        expect(service.listAllExpenses).toHaveBeenCalledTimes(1);
        expect(result).toEqual(mockExpenses);
    });

    it('Should propagate error form service', async () => {
        service.listAllExpenses.mockRejectedValueOnce(new Error('DB down'));
        await expect(controller.listExpenses()).rejects.toThrow('DB down');
    });

});