import { Post, Controller, HttpCode, HttpStatus, Body, Get, Param, ParseUUIDPipe, Patch, Delete, UseFilters, Req, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ExpensePublicDto } from "src/dto/expense-public.dto";
import { CreateExpenseDto, UpdateExpensesDto } from "src/dto/expense.dto";
import { FilterExpenseDto } from "src/dto/filter-expense.dto";
import { ExpensesService } from "src/services/expenses.service";


@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
    constructor(
        private readonly expensesService: ExpensesService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Create expense' })
    @ApiCreatedResponse({type: ExpensePublicDto})
    @ApiBadRequestResponse({ description: 'Validation error' })
    @ApiConflictResponse({ description: 'Unique violation' })
    @HttpCode(HttpStatus.CREATED)
    async createExpenses(@Body() dto: CreateExpenseDto) {

        const created = await this.expensesService.create({
            ...dto
        });

        return created;

    }

    @Get()
        async filterExpense(@Query() data: FilterExpenseDto) {
            return this.expensesService.expenseFilter(data);
        }


    @Patch(':id')
    @ApiOperation({ summary: 'Update expense for ID' })
    @ApiParam({ name: 'id', schema: { type: 'string', format: 'uuid' }, description: 'UUID expense' })
    @ApiOkResponse({ type: ExpensePublicDto})
    @ApiNotFoundResponse({ description: 'Expense not found' })

    async expensesUpdate(@Body() dto: UpdateExpensesDto, @Param('id', ParseUUIDPipe) id: string) {
        return this.expensesService.expensesUpdate(id, dto)

    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Deletar gasto por ID' })
    @ApiParam({ name: 'id', type: String, description: 'UUID expense' })
    @ApiNoContentResponse({ description: 'expense successfully removed' })
    @ApiNotFoundResponse({ description: 'Expense not found' })
    async expensesDelete(@Param('id', ParseUUIDPipe) id: string) {
        return this.expensesService.expensesDelete(id)
    }

}