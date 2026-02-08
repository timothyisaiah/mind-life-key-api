import { Injectable } from "@nestjs/common";
import { PrismaService } from "../prisma/prisma.service";
import { SUPPORTED_CURRENCIES } from "../common/constants";
import { UpdateExchangeRatesDto } from "./dto/update-exchange-rates.dto";

@Injectable()
export class ExchangeRatesService {
  constructor(private readonly prisma: PrismaService) {}

  private buildDefaultRates() {
    return SUPPORTED_CURRENCIES.reduce<Record<string, { symbol: string; rate: number }>>(
      (acc, item) => {
        acc[item.code] = { symbol: item.symbol, rate: item.rate };
        return acc;
      },
      {}
    );
  }

  async get(userId: string) {
    const existing = await this.prisma.exchangeRates.findUnique({ where: { userId } });
    if (existing) {
      return existing;
    }
    return this.prisma.exchangeRates.create({
      data: {
        userId,
        rates: this.buildDefaultRates(),
        lastExchangeRateUpdate: null
      }
    });
  }

  update(userId: string, dto: UpdateExchangeRatesDto) {
    return this.prisma.exchangeRates.upsert({
      where: { userId },
      update: {
        rates: dto.rates,
        lastExchangeRateUpdate: dto.lastExchangeRateUpdate
          ? new Date(dto.lastExchangeRateUpdate)
          : null
      },
      create: {
        userId,
        rates: dto.rates,
        lastExchangeRateUpdate: dto.lastExchangeRateUpdate
          ? new Date(dto.lastExchangeRateUpdate)
          : null
      }
    });
  }
}
