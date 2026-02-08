import { ApiPropertyOptional } from "@nestjs/swagger";
import { BudgetPeriod } from "@prisma/client";
import { IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class UpdateBudgetDto {
  @ApiPropertyOptional()
  @IsOptional()
  @IsInt()
  categoryId?: number;

  @ApiPropertyOptional({ example: "500.00" })
  @IsOptional()
  @IsString()
  amount?: string;

  @ApiPropertyOptional({ enum: BudgetPeriod })
  @IsOptional()
  @IsEnum(BudgetPeriod)
  period?: BudgetPeriod;
}
