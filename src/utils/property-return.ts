import { CreateCardDto } from "src/cards/dtos/card.dto";
import { Expenses } from "src/entitties/expenses.entity";

function toPublic(e: Expenses) {
    return {
        description: e.description,
        amount: e.amount,
        type: e.type,
        referenceMonth: e.referenceMonth
    }
}

function cardPublic(c: CreateCardDto){
    return {
        cardName: c.cardName,
        cardLimit: c.cardLimit,
        dueDay: c.dueDay
    }
}

export { toPublic, cardPublic };