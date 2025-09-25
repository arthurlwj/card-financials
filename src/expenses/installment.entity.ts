import { Column, CreateDateColumn, Entity, ManyToMany, ManyToOne, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";
import { Expenses } from "./expenses.entity";


@Entity('ínstallment')
export class Installments {

    @PrimaryGeneratedColumn('uuid')
    id: string;

    @Column({ type: 'smallint' })
    installmentNumber: number;

    @Column({ type: 'numeric', precision: 10, scale: 2 })
    installmentValue: number;

    @Column({ type: 'date' })
    dueDay: Date;

    @ManyToOne(() => Expenses, (expense) => expense.installments, { onDelete: 'CASCADE' })
    expense: Expenses;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;

}