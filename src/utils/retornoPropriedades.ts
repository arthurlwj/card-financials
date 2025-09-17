import { CreateCardDto } from "src/dto/cardDto";
import { ExpensesCreditCard } from "src/expenses/card.entity";
import { Expenses } from "src/expenses/expenses.entity";

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