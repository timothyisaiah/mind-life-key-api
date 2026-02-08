import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsInt, IsString } from "class-validator";

export class UpdateNotificationSettingsDto {
  @ApiProperty()
  @IsBoolean()
  billReminders: boolean;

  @ApiProperty()
  @IsBoolean()
  budgetAlerts: boolean;

  @ApiProperty()
  @IsBoolean()
  savingsEncouragement: boolean;

  @ApiProperty()
  @IsBoolean()
  achievementNotifications: boolean;

  @ApiProperty()
  @IsInt()
  reminderDays: number;

  @ApiProperty({ example: "80.00" })
  @IsString()
  budgetThreshold: string;

  @ApiProperty({ example: "10.00" })
  @IsString()
  savingsThreshold: string;
}
