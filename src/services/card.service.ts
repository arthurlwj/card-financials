import { Injectable, NotFoundException } from "@nestjs/common";
import { CreateCardDto, UpdateCardDto } from "src/dto/cardDto";
import { FilterCardDTO } from "src/dto/filter-cardDto";
import { ExpenseCreditCardRepository } from "src/repositories/card.repository";
import { cardPublic } from "src/utils/retornoPropriedades";


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

    async cardList() {
        return this.serviceRepo.cardList()
    }

    async cardListById(id: string) {
        const findById = this.serviceRepo.cardListById(id);

        if (!findById) {
            throw new NotFoundException('Gasto de cartão não encontrado');
        }

        return findById;
    }

    async filterCards(data: FilterCardDTO) {
        const cardFilter = await this.serviceRepo.fieldFilter(data);

        if (cardFilter.length === 0) {
            throw new NotFoundException('Cartão de crédito não encontrado')
        }

        return cardFilter;
    }

    async cardUpdate(id: string, data: UpdateCardDto) {
        const updateResult = await this.serviceRepo.cardUpdate(id, data)

        if (!updateResult.affected) throw new NotFoundException('Cartão de crédito não encontrado')

        const cardUpdated = await this.serviceRepo.cardListById(id)

        return cardPublic(cardUpdated)

    }

    async cardDelete(id: string) {
        const deleteResult = await this.serviceRepo.cardDelete(id);

        if (!deleteResult.affected) throw new NotFoundException('Cartão de Crédito não encontrado')

        return { message: 'Cartão removido com sucesso' }
    }

}