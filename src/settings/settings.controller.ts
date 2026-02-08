import { Body, Controller, Get, Put, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { UpdateAutoAllocationSettingsDto } from "./dto/update-auto-allocation-settings.dto";
import { UpdateNotificationSettingsDto } from "./dto/update-notification-settings.dto";
import { UpdateUserSettingsDto } from "./dto/update-user-settings.dto";
import { SettingsService } from "./settings.service";

@ApiTags("settings")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("settings")
export class SettingsController {
  constructor(private readonly settingsService: SettingsService) {}

  @Get("user")
  getUserSettings(@CurrentUser() user: CurrentUser) {
    return this.settingsService.getUserSettings(user.userId);
  }

  @Put("user")
  updateUserSettings(@CurrentUser() user: CurrentUser, @Body() dto: UpdateUserSettingsDto) {
    return this.settingsService.updateUserSettings(user.userId, dto);
  }

  @Get("notifications")
  getNotificationSettings(@CurrentUser() user: CurrentUser) {
    return this.settingsService.getNotificationSettings(user.userId);
  }

  @Put("notifications")
  updateNotificationSettings(
    @CurrentUser() user: CurrentUser,
    @Body() dto: UpdateNotificationSettingsDto
  ) {
    return this.settingsService.updateNotificationSettings(user.userId, dto);
  }

  @Get("auto-allocation")
  getAutoAllocationSettings(@CurrentUser() user: CurrentUser) {
    return this.settingsService.getAutoAllocationSettings(user.userId);
  }

  @Put("auto-allocation")
  updateAutoAllocationSettings(
    @CurrentUser() user: CurrentUser,
    @Body() dto: UpdateAutoAllocationSettingsDto
  ) {
    return this.settingsService.updateAutoAllocationSettings(user.userId, dto);
  }
}
