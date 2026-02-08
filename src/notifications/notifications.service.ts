import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";

@Injectable()
export class NotificationsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateNotificationDto) {
    return this.prisma.notification.create({
      data: {
        userId,
        type: dto.type,
        priority: dto.priority,
        title: dto.title,
        message: dto.message,
        icon: dto.icon,
        color: dto.color,
        action: dto.action as Prisma.InputJsonValue,
        data: dto.data as Prisma.InputJsonValue
      }
    });
  }

  findAll(userId: string) {
    return this.prisma.notification.findMany({
      where: { userId },
      orderBy: { createdAt: "desc" }
    });
  }

  async findOne(userId: string, id: string) {
    const item = await this.prisma.notification.findFirst({ where: { id, userId } });
    if (!item) {
      throw new NotFoundException("Notification not found");
    }
    return item;
  }

  async update(userId: string, id: string, dto: UpdateNotificationDto) {
    await this.findOne(userId, id);
    return this.prisma.notification.update({
      where: { id },
      data: {
        type: dto.type,
        priority: dto.priority,
        title: dto.title,
        message: dto.message,
        icon: dto.icon,
        color: dto.color,
        action: dto.action as Prisma.InputJsonValue,
        data: dto.data as Prisma.InputJsonValue
      }
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.notification.delete({ where: { id } });
  }
}
