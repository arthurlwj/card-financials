import { BadRequestException, Injectable, NotFoundException } from "@nestjs/common";
import { CreateCardDto, UpdateCardDto } from "src/cards/dtos/card.dto";
import { FilterCardDTO } from "src/cards/dtos/filter-card.dto";
import { ExpenseCreditCardRepository } from "src/cards/card.repository";
import { cardPublic } from "src/utils/property-return";


@Injectable()
export class ExpenseCreditCardService {
    constructor(private readonly serviceRepo: ExpenseCreditCardRepository) { }

    async createCreditCard(data: CreateCardDto) {
        const create = await this.serviceRepo.createOne({
            ...data,
            limitAvailable: data.cardLimit
        });

        return create;
    };

    async filterCards(data: FilterCardDTO) {
        const cardFilter = await this.serviceRepo.fieldFilter(data);

        if (cardFilter.length === 0) {
            throw new NotFoundException('Credit card not found')
        }

        return cardFilter;
    }

    async cardListById(id: string) {
        const findById = this.serviceRepo.cardListById(id);

        if (!findById) {
            throw new NotFoundException('Card not found');
        }

        return findById;
    }

    async cardUpdate(id: string, data: UpdateCardDto) {
        const updateResult = await this.serviceRepo.cardUpdate(id, data)

        if (!updateResult.affected) throw new NotFoundException('Credit card not found')

        const cardUpdated = await this.serviceRepo.cardListById(id)

        return cardPublic(cardUpdated)

    }

    async cardDelete(id: string) {
        const deleteResult = await this.serviceRepo.cardDelete(id);

        if (!deleteResult.affected) throw new NotFoundException('Credit card not found')

        return { message: 'Card removed successfully' }
    }

    async subtractFromAvailableLimit(cardId: string, amount: number): Promise<void> {

        const card = await this.serviceRepo.cardListById(cardId);

        if (!card) {
            throw new NotFoundException('Card not found')
        }

        if (card.limitAvailable < amount) {
            throw new BadRequestException('Insufficient limit for this expense')
        }

        card.limitAvailable -= amount;

        await this.serviceRepo.save(card)
    }

    async restoreFromAvailableLimit(cardId: string, amount: number): Promise<void> {
        const card = await this.serviceRepo.cardListById(cardId)

        if (!card) {
            throw new NotFoundException('Card is not found')
        }

        card.limitAvailable += amount

        await this.serviceRepo.save(card);
    }

}