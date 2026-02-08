import { Injectable } from "@nestjs/common";
import { Prisma } from "@prisma/client";
import { PrismaService } from "../prisma/prisma.service";
import {
  DEFAULT_AUTO_ALLOCATION_SETTINGS,
  DEFAULT_NOTIFICATION_SETTINGS,
  DEFAULT_USER_SETTINGS
} from "../common/constants";
import { UpdateUserSettingsDto } from "./dto/update-user-settings.dto";
import { UpdateNotificationSettingsDto } from "./dto/update-notification-settings.dto";
import { UpdateAutoAllocationSettingsDto } from "./dto/update-auto-allocation-settings.dto";

@Injectable()
export class SettingsService {
  constructor(private readonly prisma: PrismaService) {}

  async getUserSettings(userId: string) {
    const existing = await this.prisma.userSettings.findUnique({ where: { userId } });
    if (existing) {
      return existing;
    }
    return this.prisma.userSettings.create({
      data: {
        userId,
        currency: DEFAULT_USER_SETTINGS.currency,
        startingBalance: new Prisma.Decimal(DEFAULT_USER_SETTINGS.startingBalance),
        currentBalance: new Prisma.Decimal(DEFAULT_USER_SETTINGS.currentBalance)
      }
    });
  }

  updateUserSettings(userId: string, dto: UpdateUserSettingsDto) {
    return this.prisma.userSettings.upsert({
      where: { userId },
      update: {
        currency: dto.currency,
        startingBalance: new Prisma.Decimal(dto.startingBalance),
        currentBalance: new Prisma.Decimal(dto.currentBalance)
      },
      create: {
        userId,
        currency: dto.currency,
        startingBalance: new Prisma.Decimal(dto.startingBalance),
        currentBalance: new Prisma.Decimal(dto.currentBalance)
      }
    });
  }

  async getNotificationSettings(userId: string) {
    const existing = await this.prisma.notificationSettings.findUnique({ where: { userId } });
    if (existing) {
      return existing;
    }
    return this.prisma.notificationSettings.create({
      data: {
        userId,
        billReminders: DEFAULT_NOTIFICATION_SETTINGS.billReminders,
        budgetAlerts: DEFAULT_NOTIFICATION_SETTINGS.budgetAlerts,
        savingsEncouragement: DEFAULT_NOTIFICATION_SETTINGS.savingsEncouragement,
        achievementNotifications: DEFAULT_NOTIFICATION_SETTINGS.achievementNotifications,
        reminderDays: DEFAULT_NOTIFICATION_SETTINGS.reminderDays,
        budgetThreshold: new Prisma.Decimal(DEFAULT_NOTIFICATION_SETTINGS.budgetThreshold),
        savingsThreshold: new Prisma.Decimal(DEFAULT_NOTIFICATION_SETTINGS.savingsThreshold)
      }
    });
  }

  updateNotificationSettings(userId: string, dto: UpdateNotificationSettingsDto) {
    return this.prisma.notificationSettings.upsert({
      where: { userId },
      update: {
        billReminders: dto.billReminders,
        budgetAlerts: dto.budgetAlerts,
        savingsEncouragement: dto.savingsEncouragement,
        achievementNotifications: dto.achievementNotifications,
        reminderDays: dto.reminderDays,
        budgetThreshold: new Prisma.Decimal(dto.budgetThreshold),
        savingsThreshold: new Prisma.Decimal(dto.savingsThreshold)
      },
      create: {
        userId,
        billReminders: dto.billReminders,
        budgetAlerts: dto.budgetAlerts,
        savingsEncouragement: dto.savingsEncouragement,
        achievementNotifications: dto.achievementNotifications,
        reminderDays: dto.reminderDays,
        budgetThreshold: new Prisma.Decimal(dto.budgetThreshold),
        savingsThreshold: new Prisma.Decimal(dto.savingsThreshold)
      }
    });
  }

  async getAutoAllocationSettings(userId: string) {
    const existing = await this.prisma.autoAllocationSettings.findUnique({ where: { userId } });
    if (existing) {
      return existing;
    }
    return this.prisma.autoAllocationSettings.create({
      data: {
        userId,
        enabled: DEFAULT_AUTO_ALLOCATION_SETTINGS.enabled,
        percentage: new Prisma.Decimal(DEFAULT_AUTO_ALLOCATION_SETTINGS.percentage),
        priorityOrder: DEFAULT_AUTO_ALLOCATION_SETTINGS.priorityOrder
      }
    });
  }

  updateAutoAllocationSettings(userId: string, dto: UpdateAutoAllocationSettingsDto) {
    return this.prisma.autoAllocationSettings.upsert({
      where: { userId },
      update: {
        enabled: dto.enabled,
        percentage: new Prisma.Decimal(dto.percentage),
        priorityOrder: dto.priorityOrder ?? []
      },
      create: {
        userId,
        enabled: dto.enabled,
        percentage: new Prisma.Decimal(dto.percentage),
        priorityOrder: dto.priorityOrder ?? []
      }
    });
  }
}
