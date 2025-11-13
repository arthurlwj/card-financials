import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post, Query } from "@nestjs/common";
import { ApiNoContentResponse, ApiNotFoundResponse, ApiOkResponse, ApiOperation, ApiParam, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateCardDto, UpdateCardDto } from "src/dto/card.dto";
import { FilterCardDTO } from "src/dto/filter-card.dto";
import { ExpenseCreditCardService } from "src/services/card.service";


@ApiTags('cards')
@Controller('cards')
export class ExpenseCreditCardController {
    constructor(private readonly ExpenseCreditCardService: ExpenseCreditCardService) { }

    @Post()
    @ApiOperation({ summary: 'Create Card' })
    @ApiResponse({ status: 201, description: 'Cartão criado com sucesso.' })
    async createCreditCard(@Body() dto: CreateCardDto) {
        const createExpense = await this.ExpenseCreditCardService.createCreditCard({
            ...dto
        });

        return createExpense;
    };

    @Get()
    @ApiOperation({ summary: 'Get cards for filter' })
    @ApiResponse({ status: 200, description: 'OK' })
    async filterCards(@Query() data: FilterCardDTO) {
        return this.ExpenseCreditCardService.filterCards(data);
    }

    @Get(':id')
    @ApiOperation({ summary: 'Get cards for ID' })
    @ApiResponse({ status: 200, description: 'OK' })
    async cardListById(@Param('id', ParseUUIDPipe) id: string) {
        return this.ExpenseCreditCardService.cardListById(id)
    }


    @Patch(':id')
    @ApiOperation({ summary: 'Update card for ID' })
    @ApiOkResponse({ type: UpdateCardDto })
    @ApiNotFoundResponse({ description: 'Card not found' })
    async cardUpdate(@Body() data: UpdateCardDto, @Param('id', ParseUUIDPipe) id: string) {
        return this.ExpenseCreditCardService.cardUpdate(id, data)
    }


    @Delete(':id')
    @ApiOperation({ summary: 'Delete card for ID' })
    @ApiNoContentResponse({ description: 'Card successfully removed' })
    @ApiNotFoundResponse({ description: 'Card not found' })
    async cardDelete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.ExpenseCreditCardService.cardDelete(id)
    }
}