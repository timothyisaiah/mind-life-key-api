import { Body, Controller, Post, UseGuards } from "@nestjs/common";
import { ApiBearerAuth, ApiTags } from "@nestjs/swagger";
import { JwtAuthGuard } from "../auth/jwt-auth.guard";
import { CurrentUser } from "../common/decorators/current-user.decorator";
import { SyncDto } from "./dto/sync.dto";
import { SyncService } from "./sync.service";

@ApiTags("sync")
@ApiBearerAuth()
@UseGuards(JwtAuthGuard)
@Controller("sync")
export class SyncController {
  constructor(private readonly syncService: SyncService) {}

  @Post()
  sync(@CurrentUser() user: CurrentUser, @Body() dto?: SyncDto) {
    return this.syncService.sync(user.userId, dto);
  }
}
