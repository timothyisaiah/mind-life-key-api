import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { AuthModule } from "./auth/auth.module";
import { PrismaModule } from "./prisma/prisma.module";
import { TransactionsModule } from "./transactions/transactions.module";
import { BudgetsModule } from "./budgets/budgets.module";
import { GoalsModule } from "./goals/goals.module";
import { RecurringTransactionsModule } from "./recurring-transactions/recurring-transactions.module";
import { CategoriesModule } from "./categories/categories.module";
import { SettingsModule } from "./settings/settings.module";
import { ExchangeRatesModule } from "./exchange-rates/exchange-rates.module";
import { AchievementsModule } from "./achievements/achievements.module";
import { NotificationsModule } from "./notifications/notifications.module";
import { SyncModule } from "./sync/sync.module";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      envFilePath: [".env.demo", ".env"]
    }),
    PrismaModule,
    AuthModule,
    TransactionsModule,
    BudgetsModule,
    GoalsModule,
    RecurringTransactionsModule,
    CategoriesModule,
    SettingsModule,
    ExchangeRatesModule,
    AchievementsModule,
    NotificationsModule,
    SyncModule
  ]
})
export class AppModule {}
