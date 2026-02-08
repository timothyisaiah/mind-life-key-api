import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateRecurringTransactionDto } from "./dto/create-recurring-transaction.dto";
import { UpdateRecurringTransactionDto } from "./dto/update-recurring-transaction.dto";

@Injectable()
export class RecurringTransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateRecurringTransactionDto) {
    return this.prisma.recurringTransaction.create({
      data: {
        userId,
        description: dto.description,
        amount: new Prisma.Decimal(dto.amount),
        type: dto.type,
        categoryId: dto.categoryId,
        frequency: dto.frequency,
        startDate: new Date(dto.startDate),
        notes: dto.notes,
        isActive: dto.isActive ?? true
      }
    });
  }

  findAll(userId: string) {
    return this.prisma.recurringTransaction.findMany({ where: { userId } });
  }

  async findOne(userId: string, id: string) {
    const item = await this.prisma.recurringTransaction.findFirst({ where: { id, userId } });
    if (!item) {
      throw new NotFoundException("Recurring transaction not found");
    }
    return item;
  }

  async update(userId: string, id: string, dto: UpdateRecurringTransactionDto) {
    await this.findOne(userId, id);
    return this.prisma.recurringTransaction.update({
      where: { id },
      data: {
        description: dto.description,
        amount: dto.amount ? new Prisma.Decimal(dto.amount) : undefined,
        type: dto.type,
        categoryId: dto.categoryId,
        frequency: dto.frequency,
        startDate: dto.startDate ? new Date(dto.startDate) : undefined,
        notes: dto.notes,
        isActive: dto.isActive,
        lastProcessed: dto.lastProcessed ? new Date(dto.lastProcessed) : undefined,
        nextDue: dto.nextDue ? new Date(dto.nextDue) : undefined
      }
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.recurringTransaction.delete({ where: { id } });
  }
}
