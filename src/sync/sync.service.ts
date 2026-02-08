import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SyncDto } from "./dto/sync.dto";

@Injectable()
export class SyncService {
  constructor(private readonly prisma: PrismaService) {}

  async sync(userId: string, payload?: SyncDto) {
    if (payload) {
      await this.prisma.$transaction(async (tx) => {
        if (payload.transactions) {
          await tx.transaction.deleteMany({ where: { userId } });
          if (payload.transactions.length > 0) {
            await tx.transaction.createMany({
              data: payload.transactions.map((t) => ({ ...t, userId })) as never[]
            });
          }
        }

        if (payload.budgets) {
          await tx.budget.deleteMany({ where: { userId } });
          if (payload.budgets.length > 0) {
            await tx.budget.createMany({
              data: payload.budgets.map((b) => ({ ...b, userId })) as never[]
            });
          }
        }

        if (payload.goals) {
          await tx.goal.deleteMany({ where: { userId } });
          if (payload.goals.length > 0) {
            await tx.goal.createMany({
              data: payload.goals.map((g) => ({ ...g, userId })) as never[]
            });
          }
        }

        if (payload.recurringTransactions) {
          await tx.recurringTransaction.deleteMany({ where: { userId } });
          if (payload.recurringTransactions.length > 0) {
            await tx.recurringTransaction.createMany({
              data: payload.recurringTransactions.map((r) => ({ ...r, userId })) as never[]
            });
          }
        }

        if (payload.achievements) {
          await tx.achievement.deleteMany({ where: { userId } });
          if (payload.achievements.length > 0) {
            await tx.achievement.createMany({
              data: payload.achievements.map((a) => ({ ...a, userId })) as never[]
            });
          }
        }

        if (payload.notifications) {
          await tx.notification.deleteMany({ where: { userId } });
          if (payload.notifications.length > 0) {
            await tx.notification.createMany({
              data: payload.notifications.map((n) => ({ ...n, userId })) as never[]
            });
          }
        }
      });
    }

    const [
      transactions,
      budgets,
      goals,
      recurringTransactions,
      achievements,
      notifications,
      userSettings,
      notificationSettings,
      autoAllocationSettings,
      exchangeRates
    ] = await this.prisma.$transaction([
      this.prisma.transaction.findMany({ where: { userId } }),
      this.prisma.budget.findMany({ where: { userId } }),
      this.prisma.goal.findMany({ where: { userId } }),
      this.prisma.recurringTransaction.findMany({ where: { userId } }),
      this.prisma.achievement.findMany({ where: { userId } }),
      this.prisma.notification.findMany({ where: { userId } }),
      this.prisma.userSettings.findUnique({ where: { userId } }),
      this.prisma.notificationSettings.findUnique({ where: { userId } }),
      this.prisma.autoAllocationSettings.findUnique({ where: { userId } }),
      this.prisma.exchangeRates.findUnique({ where: { userId } })
    ]);

    return {
      transactions,
      budgets,
      goals,
      recurringTransactions,
      achievements,
      notifications,
      userSettings,
      notificationSettings,
      autoAllocationSettings,
      exchangeRates
    };
  }
}
