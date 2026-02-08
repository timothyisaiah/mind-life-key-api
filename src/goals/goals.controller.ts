import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { CreateGoalDto } from "./dto/create-goal.dto";
import { UpdateGoalDto } from "./dto/update-goal.dto";
import { GoalsService } from "./goals.service";

@ApiTags("goals")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("goals")
export class GoalsController {
  constructor(private readonly goalsService: GoalsService) {}

  @Post()
  create(@CurrentUser() user: CurrentUser, @Body() dto: CreateGoalDto) {
    return this.goalsService.create(user.userId, dto);
  }

  @Get()
  findAll(@CurrentUser() user: CurrentUser) {
    return this.goalsService.findAll(user.userId);
  }

  @Get(":id")
  findOne(@CurrentUser() user: CurrentUser, @Param("id") id: string) {
    return this.goalsService.findOne(user.userId, id);
  }

  @Put(":id")
  update(@CurrentUser() user: CurrentUser, @Param("id") id: string, @Body() dto: UpdateGoalDto) {
    return this.goalsService.update(user.userId, id, dto);
  }

  @Delete(":id")
  remove(@CurrentUser() user: CurrentUser, @Param("id") id: string) {
    return this.goalsService.remove(user.userId, id);
  }
}
