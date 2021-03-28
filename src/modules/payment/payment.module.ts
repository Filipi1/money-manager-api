import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Payment } from 'src/classes/payment.entity';
import { PaymentsController } from 'src/controllers/payments/payments.controller';
import { PaymentService } from 'src/services/payment/payment.service';

@Module({
    imports: [
        TypeOrmModule.forFeature([Payment])
    ],
    controllers: [PaymentsController],
    providers: [PaymentService],
    exports: [PaymentService]
})
export class PaymentModule {}
