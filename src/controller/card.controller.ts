import { Body, Controller, Delete, Get, Param, ParseUUIDPipe, Patch, Post } from "@nestjs/common";
import { CreateCardDto, UpdateCardDto } from "src/dto/cardDto";
import { ExpenseCreditCardService } from "src/services/card.service";



@Controller('cards')
export class ExpenseCreditCardController {
    constructor(private readonly ExpenseCreditCardService: ExpenseCreditCardService) { }

    @Post()
    async createCreditCard(@Body() dto: CreateCardDto) {
        const createExpense = await this.ExpenseCreditCardService.createCreditCard({

            cardName: dto.cardName,
            cardLimit: dto.cardLimit,
            dueDay: dto.dueDay
        });

        return createExpense;
    };

    @Get()
    async cardList() {
        return this.ExpenseCreditCardService.cardList()
    }

    @Get(':id')
    async cardListById(@Param('id', ParseUUIDPipe) id: string) {
        return this.ExpenseCreditCardService.cardListById(id)
    }

    @Patch(':id')
    async cardUpdate(@Body() data: UpdateCardDto, @Param('id', ParseUUIDPipe) id: string) {
        return this.ExpenseCreditCardService.cardUpdate(id, data)
    }


    @Delete(':id')
    async cardDelete(@Param('id', ParseUUIDPipe) id: string) {
        return await this.ExpenseCreditCardService.cardDelete(id)
    }
}