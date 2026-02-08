import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { UpdateExchangeRatesDto } from "./dto/update-exchange-rates.dto";
import { ExchangeRatesService } from "./exchange-rates.service";

@ApiTags("exchange-rates")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("exchange-rates")
export class ExchangeRatesController {
  constructor(private readonly exchangeRatesService: ExchangeRatesService) {}

  @Get()
  get(@CurrentUser() user: CurrentUser) {
    return this.exchangeRatesService.get(user.userId);
  }

  @Put()
  update(@CurrentUser() user: CurrentUser, @Body() dto: UpdateExchangeRatesDto) {
    return this.exchangeRatesService.update(user.userId, dto);
  }
}
