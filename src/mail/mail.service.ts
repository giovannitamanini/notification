import { Injectable } from '@nestjs/common';
import { Mail, MailType } from '@prisma/client';

import { PrismaService } from 'src/prisma.service';
import DataMessage from './types/message';

@Injectable()
export class MailService {
  constructor(private prisma: PrismaService) {}

  async getMailByIdUser(idUser: string): Promise<Mail[] | null> {
    return await this.prisma.mail.findMany({ where: { idUser } });
  }

  async sendMail(content: DataMessage, type: string) {
    console.log(`Email Type => ${type}`);
    console.log(`Email Content => ${JSON.stringify(content)}`);
  }

  async persistNotification(content: DataMessage, type: MailType) {
    const data = {
      idUser: content.idUser,
      mailDestination: this.getDestination(content.idUser),
      mailContent: this.makeContent(content.orderNumber, content.orderValue),
      mailType: type,
    };

    await this.prisma.mail.create({
      data: { ...data },
    });
  }

  getDestination(idUser: string) {
    switch (idUser) {
      case '10':
        return 'user10@teste.com.br';
      case '20':
        return 'user20@teste.com.br';
      default:
        return 'default@teste.com.br';
    }
  }

  makeContent(orderNumber: number, orderValue: number) {
    return `Número do pedido: ${orderNumber.toString()} \n\nValor do pedido: ${orderValue.toString()}`;
  }
}
