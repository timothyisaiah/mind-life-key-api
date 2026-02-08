import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { CreateRecurringTransactionDto } from "./dto/create-recurring-transaction.dto";
import { UpdateRecurringTransactionDto } from "./dto/update-recurring-transaction.dto";
import { RecurringTransactionsService } from "./recurring-transactions.service";

@ApiTags("recurring-transactions")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("recurring-transactions")
export class RecurringTransactionsController {
  constructor(private readonly recurringTransactionsService: RecurringTransactionsService) {}

  @Post()
  create(@CurrentUser() user: CurrentUser, @Body() dto: CreateRecurringTransactionDto) {
    return this.recurringTransactionsService.create(user.userId, dto);
  }

  @Get()
  findAll(@CurrentUser() user: CurrentUser) {
    return this.recurringTransactionsService.findAll(user.userId);
  }

  @Get(":id")
  findOne(@CurrentUser() user: CurrentUser, @Param("id") id: string) {
    return this.recurringTransactionsService.findOne(user.userId, id);
  }

  @Put(":id")
  update(
    @CurrentUser() user: CurrentUser,
    @Param("id") id: string,
    @Body() dto: UpdateRecurringTransactionDto
  ) {
    return this.recurringTransactionsService.update(user.userId, id, dto);
  }

  @Delete(":id")
  remove(@CurrentUser() user: CurrentUser, @Param("id") id: string) {
    return this.recurringTransactionsService.remove(user.userId, id);
  }
}
