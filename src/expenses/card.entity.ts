import { BaseEntity, Column, CreateDateColumn, Entity, OneToMany, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Expenses } from "./expenses.entity";

@Entity('cards')
export class ExpensesCreditCard extends BaseEntity {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ nullable: false, type: 'varchar', length: 120 })
    cardName: string;

    @Column({
        type: 'numeric', precision: 12, scale: 2, transformer: {
            to: (value: number) => value,
            from: (value: string) => Number(value)
        }
    })
    cardLimit: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    limitAvailable: number;

    @Column({type: 'smallint'})
    dueDay: number;

    @OneToMany(() => Expenses, (expenses) => expenses.card)
    expenses:Expenses[];

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}