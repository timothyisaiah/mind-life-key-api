import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { UpdateBudgetDto } from "./dto/update-budget.dto";

@Injectable()
export class BudgetsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateBudgetDto) {
    return this.prisma.budget.create({
      data: {
        userId,
        categoryId: dto.categoryId,
        amount: new Prisma.Decimal(dto.amount),
        period: dto.period
      }
    });
  }

  findAll(userId: string) {
    return this.prisma.budget.findMany({ where: { userId } });
  }

  async findOne(userId: string, id: string) {
    const item = await this.prisma.budget.findFirst({ where: { id, userId } });
    if (!item) {
      throw new NotFoundException("Budget not found");
    }
    return item;
  }

  async update(userId: string, id: string, dto: UpdateBudgetDto) {
    await this.findOne(userId, id);
    return this.prisma.budget.update({
      where: { id },
      data: {
        categoryId: dto.categoryId,
        amount: dto.amount ? new Prisma.Decimal(dto.amount) : undefined,
        period: dto.period
      }
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.budget.delete({ where: { id } });
  }
}
