import { Expenses } from "src/expenses/expenses.entity";

function toPublic(e: Expenses) {
    return {
        description: e.description,
        amount: e.amount,
        type: e.type,
        referenceMonth: e.referenceMonth
    }
}

export default toPublic;