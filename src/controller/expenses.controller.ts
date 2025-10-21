import { Post, Controller, HttpCode, HttpStatus, Body, Get, Param, ParseUUIDPipe, Patch, Delete, UseFilters, Req, Query } from "@nestjs/common";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ExpensePublicDto } from "src/dto/ExpensePublicDto";
import { CreateExpenseDto, UpdateExpensesDto } from "src/dto/ExpensesDto";
import { FilterExpenseDto } from "src/dto/filter-expenseDto";
import { ExpensesService } from "src/services/expenses.service";


@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
    constructor(
        private readonly expensesService: ExpensesService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Criar gasto' })
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

    @Get(':id')
    @ApiOperation({ summary: 'Buscar por ID' })
    @ApiParam({ name: 'id', type: String, description: 'UUID do gasto' })
    @ApiOkResponse({ type: ExpensePublicDto })
    @ApiNotFoundResponse({ description: 'Gasto não encontrado' })

    @Patch(':id')
    @ApiOperation({ summary: 'Atualizar gasto por ID' })
    @ApiParam({ name: 'id', schema: { type: 'string', format: 'uuid' }, description: 'UUID do gasto' })
    @ApiOkResponse({ type: ExpensePublicDto})
    @ApiNotFoundResponse({ description: 'Gasto não encontrado' })

    async expensesUpdate(@Body() dto: UpdateExpensesDto, @Param('id', ParseUUIDPipe) id: string) {
        return this.expensesService.expensesUpdate(id, dto)

    }

    @Delete(':id')
    @HttpCode(HttpStatus.NO_CONTENT)
    @ApiOperation({ summary: 'Deletar gasto por ID' })
    @ApiParam({ name: 'id', type: String, description: 'UUID do gasto' })
    @ApiNoContentResponse({ description: 'Gasto deletado com sucesso' })
    @ApiNotFoundResponse({ description: 'Gasto não encontrado' })
    async expensesDelete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.expensesService.expensesDelete(id)
    }

}