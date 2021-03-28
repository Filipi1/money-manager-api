import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Payment } from 'src/classes/payment.entity';
import { Repository } from 'typeorm';

@Injectable()
export class PaymentService {
    constructor(
        @InjectRepository(Payment)
        private paymentRepository: Repository<Payment>
    ) { }

    async findAll(ownerId: number): Promise<Payment[]> {
        return await this.paymentRepository.find({userId: ownerId});
    }

    async findOneById(id: number): Promise<Payment> {
        return await this.paymentRepository.findOne(id);
    }

    async findOne(paymentTitle: string): Promise<Payment> {
        return await this.paymentRepository.findOne({ title: paymentTitle });
    }

    async create(payment: Payment): Promise<Payment> {
        return await this.paymentRepository.save(payment);
    }

    async update(id: number, payment: Payment) {
        return await this.paymentRepository.update(id, payment);
    }

    async remove(id: number): Promise<void> {
        await this.paymentRepository.delete(id);
    }
}