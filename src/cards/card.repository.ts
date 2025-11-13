import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { CreateCardDto, UpdateCardDto } from "src/cards/dtos/card.dto";
import { FilterCardDTO } from "src/cards/dtos/filter-card.dto";
import { Card } from "src/entitties/card.entity";
import { mapPostgresError } from "src/utils/postgres-error.utils";
import { DeepPartial, Repository } from "typeorm";

@Injectable()
export class ExpenseCreditCardRepository {

    constructor(
        @InjectRepository(Card)
        private readonly repo: Repository<Card>
    ) { }


    async createOne(data: DeepPartial<Card>): Promise<Card> {
        const cardDate = this.repo.create(data);

        try {
            return await this.repo.save(cardDate);
        } catch (e) {
            throw mapPostgresError(e) ?? e;
        }

    }

    async cardList(): Promise<CreateCardDto[]> {
        return this.repo.find()
    }

    async cardListById(id: string): Promise<Card | null> {
        return this.repo.findOne({ where: { id } })
    }

    async fieldFilter(data: FilterCardDTO) {
        const query = this.repo.createQueryBuilder('card');

        if (data.cardName) query.andWhere('card.cardName = :cardName', { cardName: data.cardName });
        if (data.cardLimit) query.andWhere('card.cardLimit = :cardLimit', { cardLimit: data.cardLimit });
        if (data.dueDay) query.andWhere('card.dueDay = :dueDay', { dueDay: data.dueDay });

        return query.getMany();
    }

    async cardUpdate(id: string, data: UpdateCardDto) {

        try {
            return this.repo.update({ id }, data);
        } catch (e) {
           throw mapPostgresError(e) ?? e;
        }
    }

    async cardDelete(id: string) {
        try {
            return this.repo.delete({ id });
        } catch (e) {
            throw mapPostgresError(e) ?? e;
        }
    }

    async save(card: DeepPartial<Card> | DeepPartial<Card>[]): Promise<Card | Card[]> {
            if (Array.isArray(card)) {
                const entities = card.map((item => this.repo.create(item)));
                const saved = await this.repo.save(entities);
                return saved as Card[]
            }
    
            const entity = this.repo.create(card);
            const saved = await this.repo.save(entity);
            return saved as Card;
    
        }
}
