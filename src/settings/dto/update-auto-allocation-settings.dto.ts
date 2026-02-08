import { ApiProperty } from "@nestjs/swagger";
import { ArrayNotEmpty, IsArray, IsBoolean, IsOptional, IsString } from "class-validator";

export class UpdateAutoAllocationSettingsDto {
  @ApiProperty()
  @IsBoolean()
  enabled: boolean;

  @ApiProperty({ example: "15.00" })
  @IsString()
  percentage: string;

  @ApiProperty({ example: ["goal-uuid-1", "goal-uuid-2"] })
  @IsArray()
  @IsString({ each: true })
  @IsOptional()
  @ArrayNotEmpty()
  priorityOrder?: string[];
}
