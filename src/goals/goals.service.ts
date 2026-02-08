import { Injectable, NotFoundException } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import { CreateGoalDto } from "./dto/create-goal.dto";
import { UpdateGoalDto } from "./dto/update-goal.dto";

@Injectable()
export class GoalsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateGoalDto) {
    return this.prisma.goal.create({
      data: {
        userId,
        name: dto.name,
        targetAmount: new Prisma.Decimal(dto.targetAmount),
        currentAmount: new Prisma.Decimal(dto.currentAmount),
        targetDate: new Date(dto.targetDate),
        description: dto.description
      }
    });
  }

  findAll(userId: string) {
    return this.prisma.goal.findMany({ where: { userId } });
  }

  async findOne(userId: string, id: string) {
    const item = await this.prisma.goal.findFirst({ where: { id, userId } });
    if (!item) {
      throw new NotFoundException("Goal not found");
    }
    return item;
  }

  async update(userId: string, id: string, dto: UpdateGoalDto) {
    await this.findOne(userId, id);
    return this.prisma.goal.update({
      where: { id },
      data: {
        name: dto.name,
        targetAmount: dto.targetAmount ? new Prisma.Decimal(dto.targetAmount) : undefined,
        currentAmount: dto.currentAmount ? new Prisma.Decimal(dto.currentAmount) : undefined,
        targetDate: dto.targetDate ? new Date(dto.targetDate) : undefined,
        description: dto.description
      }
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.goal.delete({ where: { id } });
  }
}
