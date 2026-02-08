import { ApiProperty } from "@nestjs/swagger";
import { RecurringFrequency, TransactionType } from "@prisma/client";
import { IsBoolean, IsDateString, IsEnum, IsInt, IsOptional, IsString } from "class-validator";

export class CreateRecurringTransactionDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ example: "100.00" })
  @IsString()
  amount: string;

  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty()
  @IsInt()
  categoryId: number;

  @ApiProperty({ enum: RecurringFrequency })
  @IsEnum(RecurringFrequency)
  frequency: RecurringFrequency;

  @ApiProperty({ example: "2026-01-31" })
  @IsDateString()
  startDate: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;
}
