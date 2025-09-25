import { Post, Controller, HttpCode, HttpStatus, Body, Get, Param, ParseUUIDPipe, Patch, Delete, UseFilters, Req } from "@nestjs/common";
import { ApiBadRequestResponse, ApiConflictResponse, ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ExpensePublicDto } from "src/dto/ExpensePublicDto";
import { CreateExpenseDto, UpdateExpensesDto } from "src/dto/ExpensesDto";
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
    @ApiOperation({ summary: 'Listar gastos' })
    @ApiOkResponse({
        description: 'Lista de gastos cadastrados',
        type: ExpensePublicDto,
        isArray: true,
      })
    async listExpenses(): Promise<ExpensePublicDto[]> {
        return this.expensesService.listAllExpenses();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar por ID' })
    @ApiParam({ name: 'id', type: String, description: 'UUID do gasto' })
    @ApiOkResponse({ type: ExpensePublicDto })
    @ApiNotFoundResponse({ description: 'Gasto não encontrado' })

    async listExpenseById(@Param('id', ParseUUIDPipe) id: string) {
        return this.expensesService.expenseListById(id);
    }

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