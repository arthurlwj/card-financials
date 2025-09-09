import { Post, Controller, HttpCode, HttpStatus, Body, Get, Param, ParseUUIDPipe, Patch, Delete } from "@nestjs/common";
import { ApiCreatedResponse, ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiTags } from "@nestjs/swagger";
import { ExpensePublicDto } from "src/dto/ExpensePublicDto";
import { CreateExpenseDto, UpdateExpensesDto } from "src/dto/ExpensesDto";
import { ExpensesService } from "src/services/expensesService";


@ApiTags('expenses')
@Controller('expenses')
export class ExpensesController {
    constructor(
        private readonly expensesService: ExpensesService
    ) { }

    @Post()
    @ApiOperation({ summary: 'Criar gasto' })
    @ApiCreatedResponse({type: ExpensePublicDto})
    @HttpCode(HttpStatus.CREATED)
    async createExpenses(@Body() dto: CreateExpenseDto) {

        const created = await this.expensesService.create({
            description: dto.description,
            amount: dto.amount,
            type: dto.type,
            referenceMonth: dto.referenceMonth,
        })

        return created;

    }

    @Get()
    @ApiOperation({ summary: 'Listar gastos' })
    @ApiOkResponse({
        description: 'Lista de gastos cadastrados',
        type: ExpensePublicDto,
        isArray: true,
      })
    async listExpenses() {
        return this.expensesService.listAllExpenses();
    }

    @Get(':id')
    @ApiOperation({ summary: 'Buscar por ID' })
    @ApiParam({ name: 'id', type: String, description: 'UUID do gasto' })
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
    @ApiOperation({ summary: 'Deletar gasto por ID' })
    @ApiParam({ name: 'id', type: String, description: 'UUID do gasto' })
    @ApiNoContentResponse({ description: 'Gasto deletado com sucesso' })
    @ApiNotFoundResponse({ description: 'Gasto não encontrado' })
    async expensesDelete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.expensesService.expensesDelete(id)
    }

}