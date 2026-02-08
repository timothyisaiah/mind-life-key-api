import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { CreateAchievementDto } from "./dto/create-achievement.dto";
import { UpdateAchievementDto } from "./dto/update-achievement.dto";
import { AchievementsService } from "./achievements.service";

@ApiTags("achievements")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("achievements")
export class AchievementsController {
  constructor(private readonly achievementsService: AchievementsService) {}

  @Post()
  create(@CurrentUser() user: CurrentUser, @Body() dto: CreateAchievementDto) {
    return this.achievementsService.create(user.userId, dto);
  }

  @Get()
  findAll(@CurrentUser() user: CurrentUser) {
    return this.achievementsService.findAll(user.userId);
  }

  @Get(":id")
  findOne(@CurrentUser() user: CurrentUser, @Param("id") id: string) {
    return this.achievementsService.findOne(user.userId, id);
  }

  @Put(":id")
  update(
    @CurrentUser() user: CurrentUser,
    @Param("id") id: string,
    @Body() dto: UpdateAchievementDto
  ) {
    return this.achievementsService.update(user.userId, id, dto);
  }

  @Delete(":id")
  remove(@CurrentUser() user: CurrentUser, @Param("id") id: string) {
    return this.achievementsService.remove(user.userId, id);
  }
}
