import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { CreateBudgetDto } from "./dto/create-budget.dto";
import { UpdateBudgetDto } from "./dto/update-budget.dto";
import { BudgetsService } from "./budgets.service";

@ApiTags("budgets")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("budgets")
export class BudgetsController {
  constructor(private readonly budgetsService: BudgetsService) {}

  @Post()
  create(@CurrentUser() user: CurrentUser, @Body() dto: CreateBudgetDto) {
    return this.budgetsService.create(user.userId, dto);
  }

  @Get()
  findAll(@CurrentUser() user: CurrentUser) {
    return this.budgetsService.findAll(user.userId);
  }

  @Get(":id")
  findOne(@CurrentUser() user: CurrentUser, @Param("id") id: string) {
    return this.budgetsService.findOne(user.userId, id);
  }

  @Put(":id")
  update(@CurrentUser() user: CurrentUser, @Param("id") id: string, @Body() dto: UpdateBudgetDto) {
    return this.budgetsService.update(user.userId, id, dto);
  }

  @Delete(":id")
  remove(@CurrentUser() user: CurrentUser, @Param("id") id: string) {
    return this.budgetsService.remove(user.userId, id);
  }
}
