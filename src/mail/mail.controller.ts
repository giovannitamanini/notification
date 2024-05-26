import { Controller, Get, Logger, Query } from '@nestjs/common';
import { MailService } from './mail.service';
import { Mail, MailType, Prisma } from '@prisma/client';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import DataMessage from './types/message';

@Controller('mail')
export class MailController {
  constructor(private readonly mailService: MailService) {}

  private readonly logger = new Logger(MailController.name);

  // idUser: string): Promise....
  @Get('get')
  async getMail(@Query('idUser') idUser: string): Promise<Mail[] | null> {
    return await this.mailService.getMailByIdUser(idUser);
  }

  @MessagePattern('register')
  async readRegisterPayment(@Payload() payload: any, @Ctx() context: RmqContext,) {
    try {
      this.logger.log(`data - register: ${JSON.stringify(payload)}`);

      const dataMessage: DataMessage = JSON.parse(payload.data.notification);
      const channel = context.getChannelRef();
      const originalMesage = context.getMessage();

      channel.ack(originalMesage);

      await this.mailService.sendMail(dataMessage, MailType.orderConfirmation);
      await this.mailService.persistNotification(dataMessage, MailType.orderConfirmation,);
    } catch (error) {
      this.logger.error(error);
    }
  }

  @MessagePattern('confirmation')
  async readConfimationPayment(@Payload() payload: any, @Ctx() context: RmqContext,) {
    try {
      this.logger.log(`data - confirmation: ${JSON.stringify(payload)}`)
      
      const dataMessage: DataMessage = JSON.parse(payload.data.notification);
      const channel = context.getChannelRef();
      const originalMesage = context.getMessage();

      channel.ack(originalMesage);

      await this.mailService.sendMail(dataMessage, MailType.paymentConfirmation,);
      await this.mailService.persistNotification(dataMessage, MailType.paymentConfirmation,);
    } catch (error) {
      this.logger.error(error);
    }
  }
}
