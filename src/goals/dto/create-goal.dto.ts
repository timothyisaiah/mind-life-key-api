import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsOptional, IsString } from "class-validator";

export class CreateGoalDto {
  @ApiProperty()
  @IsString()
  name: string;

  @ApiProperty({ example: "10000.00" })
  @IsString()
  targetAmount: string;

  @ApiProperty({ example: "0.00" })
  @IsString()
  currentAmount: string;

  @ApiProperty({ example: "2026-12-31" })
  @IsDateString()
  targetDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  description?: string;
}
