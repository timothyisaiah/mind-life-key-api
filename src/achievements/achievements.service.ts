import { Injectable, NotFoundException } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { CreateAchievementDto } from "./dto/create-achievement.dto";
import { UpdateAchievementDto } from "./dto/update-achievement.dto";

@Injectable()
export class AchievementsService {
  constructor(private readonly prisma: PrismaService) {}

  create(userId: string, dto: CreateAchievementDto) {
    return this.prisma.achievement.create({
      data: {
        userId,
        title: dto.title,
        description: dto.description,
        icon: dto.icon,
        earned: dto.earned,
        earnedAt: dto.earnedAt ? new Date(dto.earnedAt) : null,
        goalId: dto.goalId
      }
    });
  }

  findAll(userId: string) {
    return this.prisma.achievement.findMany({ where: { userId } });
  }

  async findOne(userId: string, id: string) {
    const item = await this.prisma.achievement.findFirst({ where: { id, userId } });
    if (!item) {
      throw new NotFoundException("Achievement not found");
    }
    return item;
  }

  async update(userId: string, id: string, dto: UpdateAchievementDto) {
    await this.findOne(userId, id);
    return this.prisma.achievement.update({
      where: { id },
      data: {
        title: dto.title,
        description: dto.description,
        icon: dto.icon,
        earned: dto.earned,
        earnedAt: dto.earnedAt ? new Date(dto.earnedAt) : undefined,
        goalId: dto.goalId
      }
    });
  }

  async remove(userId: string, id: string) {
    await this.findOne(userId, id);
    return this.prisma.achievement.delete({ where: { id } });
  }
}
