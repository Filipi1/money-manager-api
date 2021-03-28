import { Body, Header, HttpException, HttpStatus, Req } from '@nestjs/common';
import { Controller, Get, HttpService, Post, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { Payment, PaymentStatus, RecurrenceType } from 'src/classes/payment.entity';
import { PaymentService } from 'src/services/payment/payment.service';
import { EnumConversor } from 'src/util/enum-extractor.util';
import { ParametersValidator } from 'src/util/parameters-validator.util';

@Controller('payments')
export class PaymentsController {
    
    constructor(private paymentService: PaymentService) {}

    @Get('types')
    @UseGuards(AuthGuard('jwt'))
    getRecurrenceTypes() {
        return EnumConversor.convertToObject(RecurrenceType)
    }

    @Get('status')
    @UseGuards(AuthGuard('jwt'))
    getPaymentStatus() {
        return EnumConversor.convertToObject(PaymentStatus)
    }

    @Get()
    @UseGuards(AuthGuard('jwt'))
    async getPayments(@Req() request) {
        const payments = await this.paymentService.findAll(request.user.id)
        if (!payments)
            throw new HttpException("Nenhum pagamento encontrado", HttpStatus.NOT_FOUND)

        return payments
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    async createPayment(@Body() payment: Payment, @Req() request) {
        ParametersValidator.validate(payment, <Payment>{ 
            title: payment.title,
            value: payment.value,
            recurrence: payment.recurrence
        })
        
        payment.userId = request.user.id
        if (payment.value <= 0)
            throw new HttpException("O Valor não pode ser zero", HttpStatus.BAD_REQUEST)

        return this.paymentService.create(payment)
    }
}