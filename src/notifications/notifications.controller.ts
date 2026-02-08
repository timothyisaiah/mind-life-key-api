import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { CreateNotificationDto } from "./dto/create-notification.dto";
import { UpdateNotificationDto } from "./dto/update-notification.dto";
import { NotificationsService } from "./notifications.service";

@ApiTags("notifications")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("notifications")
export class NotificationsController {
  constructor(private readonly notificationsService: NotificationsService) {}

  @Post()
  create(@CurrentUser() user: CurrentUser, @Body() dto: CreateNotificationDto) {
    return this.notificationsService.create(user.userId, dto);
  }

  @Get()
  findAll(@CurrentUser() user: CurrentUser) {
    return this.notificationsService.findAll(user.userId);
  }

  @Get(":id")
  findOne(@CurrentUser() user: CurrentUser, @Param("id") id: string) {
    return this.notificationsService.findOne(user.userId, id);
  }

  @Put(":id")
  update(
    @CurrentUser() user: CurrentUser,
    @Param("id") id: string,
    @Body() dto: UpdateNotificationDto
  ) {
    return this.notificationsService.update(user.userId, id, dto);
  }

  @Delete(":id")
  remove(@CurrentUser() user: CurrentUser, @Param("id") id: string) {
    return this.notificationsService.remove(user.userId, id);
  }
}
