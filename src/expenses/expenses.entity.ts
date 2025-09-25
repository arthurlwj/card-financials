import { TypeOfSpending } from "src/enums/type-of-spending.enum";
import { BaseEntity, Column, CreateDateColumn, Entity, Index, ManyToOne, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { ExpensesCreditCard } from "./card.entity";
import { Installments } from "./installment.entity";


@Entity('expenses')
@Index('idx_expenses_reference_month', ['referenceMonth'])
@Index('idx_expenses_type_month', ['type', 'referenceMonth'])
export class Expenses extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 120 })
    description: string;

    @Column({
        type: 'numeric',
        precision: 12,
        scale: 2,
        transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value),
        }
    })
    amount: number;

    @Column({ nullable: false, type: 'enum', enum: TypeOfSpending })
    type: TypeOfSpending;
    @Column({
        type: 'date',
        default: () => "date_trunc('month', now())::date"
    })
    referenceMonth: string;

    @Column({ type: 'date', nullable: true })
    firstInstallmentDate: Date;

    @Column({ type: 'smallint', nullable: true })
    quantityInstallments: number;

    @ManyToOne(() => ExpensesCreditCard, (card) => card.expenses, { onDelete: 'CASCADE' })
    card: ExpensesCreditCard;

    @OneToMany(() => Installments, (installments) => installments.expense, { cascade: true })
    installments: Installments[]

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}