import { ApiProperty } from "@nestjs/swagger";
import { IsBoolean, IsDateString, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateAchievementDto {
  @ApiProperty()
  @IsString()
  title: string;

  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty()
  @IsString()
  icon: string;

  @ApiProperty()
  @IsBoolean()
  earned: boolean;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsDateString()
  earnedAt?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  goalId?: string;
}
