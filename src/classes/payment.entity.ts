import { Column,  Entity, PrimaryGeneratedColumn } from "typeorm";

export enum RecurrenceType {
    ONCE,
    MONTLY,
    QUARTERLY,
    ANUALY
}

export enum PaymentStatus {
    PENDING,
    DELAYED,
    PAID,
    FINESHED
}

@Entity()
export class Payment {
    @PrimaryGeneratedColumn()
    id: number

    @Column()
    userId: number

    @Column()
    title: string

    @Column({nullable: true})
    notes: string

    @Column()
    value: number

    @Column()
    recurrence: Date

    @Column({default: PaymentStatus.PENDING})
    status: PaymentStatus

    @Column({default: RecurrenceType.ONCE})
    type: RecurrenceType
}