import { BaseEntity, Column, CreateDateColumn, Entity, PrimaryColumn, PrimaryGeneratedColumn, UpdateDateColumn } from "typeorm";

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

    @Column({type: 'smallint'})
    dueDay: number;

    @CreateDateColumn({ type: 'timestamptz' })
    createdAt: Date;

    @UpdateDateColumn({ type: 'timestamptz' })
    updatedAt: Date;
}