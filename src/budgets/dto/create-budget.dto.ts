import { ApiProperty } from "@nestjs/swagger";
import { BudgetPeriod } from "@prisma/client";
import { IsEnum, IsInt, IsString } from "class-validator";

export class CreateBudgetDto {
  @ApiProperty()
  @IsInt()
  categoryId: number;

  @ApiProperty({ example: "500.00" })
  @IsString()
  amount: string;

  @ApiProperty({ enum: BudgetPeriod })
  @IsEnum(BudgetPeriod)
  period: BudgetPeriod;
}
