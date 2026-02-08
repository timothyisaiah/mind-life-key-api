import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma, TransactionType } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateTransactionDto } from "./dto/create-transaction.dto";
import { UpdateTransactionDto } from "./dto/update-transaction.dto";
import { TransactionQueryDto } from "./dto/transaction-query.dto";

@Injectable()
export class TransactionsService {
  constructor(private readonly prisma: PrismaService) {}

  async create(userId: string, dto: CreateTransactionDto) {
    return this.prisma.transaction.create({
      data: {
        userId,
        description: dto.description,
        amount: new Prisma.Decimal(dto.amount),
        categoryId: dto.categoryId,
        date: new Date(dto.date),
        type: dto.type,
        notes: dto.notes,
        currency: dto.currency,
        recurringTransactionId: dto.recurringTransactionId
      }
    });
  }

  async findAll(userId: string, query: TransactionQueryDto) {
    const { page = 1, limit = 20, startDate, endDate, categoryId, type } = query;
    const where: Prisma.TransactionWhereInput = { userId };

    if (startDate || endDate) {
      where.date = {};
      if (startDate) {
        where.date.gte = new Date(startDate);
      }
      if (endDate) {
        where.date.lte = new Date(endDate);
      }
    }

    if (categoryId) {
      where.categoryId = categoryId;
    }
    if (type) {
      where.type = type as TransactionType;
    }

    const [items, total] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({
        where,
        orderBy: { date: "desc" },
        skip: (page - 1) * limit,
        take: limit
      }),
      this.prisma.transaction.count({ where })
    ]);

    return {
      items,
      pagination: {
        page,
        limit,
        total
      }
    };
  }

  async findOne(userId: string, id: string) {
    const item = await this.prisma.transaction.findFirst({ where: { id, userId } });
    if (!item) {
      throw new NotFoundException("Transaction not found");
    }
    return item;
  }

  async update(userId: string, id: string, dto: UpdateTransactionDto) {
    await this.findOne(userId, id);
    return this.prisma.transaction.update({
      where: { id },
      data: {
        description: dto.description,
        amount: dto.amount ? new Prisma.Decimal(dto.amount) : undefined,
        categoryId: dto.categoryId,
        date: dto.date ? new Date(dto.date) : undefined,
        type: dto.type,
        notes: dto.notes,
        currency: dto.currency,
        recurringTransactionId: dto.recurringTransactionId
      }
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.transaction.delete({ where: { id } });
  }
}
