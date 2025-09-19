import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCardDto, UpdateCardDto } from "src/dto/cardDto";
import { FilterCardDTO } from "src/dto/filter-cardDto";
import { ExpensesCreditCard } from "src/expenses/card.entity";
import { Repository } from "typeorm";



@Injectable()
export class ExpenseCreditCardRepository {

    constructor(
        @InjectRepository(ExpensesCreditCard)
        private readonly repo: Repository<ExpensesCreditCard>
    ) { }


    async createOne(data: CreateCardDto) {
        const cardDate = this.repo.create(data);
        return await this.repo.save(cardDate)
    }

    async cardList(): Promise<CreateCardDto[]> {
        return this.repo.find()
    }

    async cardListById(id: string): Promise<CreateCardDto | null> {
        return this.repo.findOne({ where: { id } })
    }

    async fieldFilter(data: FilterCardDTO) {
        const query = this.repo.createQueryBuilder('card');

        if(data.cardName) query.andWhere('card.cardName = :cardName', {cardName: data.cardName});
        if(data.cardLimit) query.andWhere('card.cardLimit = :cardLimit', {cardLimit: data.cardLimit});
        if(data.dueDay) query.andWhere('card.dueDay = :dueDay', {dueDay: data.dueDay});

        return query.getMany();
    }









    async cardUpdate(id: string, data: UpdateCardDto) {
        return this.repo.update({ id }, data)
    }

    async cardDelete(id: string) {
        return this.repo.delete({ id });
    }
}
