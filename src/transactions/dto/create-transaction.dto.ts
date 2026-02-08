import { ApiProperty } from "@nestjs/swagger";
import { TransactionType } from "@prisma/client";
import { IsDateString, IsEnum, IsInt, IsOptional, IsString, IsUUID } from "class-validator";

export class CreateTransactionDto {
  @ApiProperty()
  @IsString()
  description: string;

  @ApiProperty({ example: "1200.50" })
  @IsString()
  amount: string;

  @ApiProperty()
  @IsInt()
  categoryId: number;

  @ApiProperty({ example: "2026-01-31" })
  @IsDateString()
  date: string;

  @ApiProperty({ enum: TransactionType })
  @IsEnum(TransactionType)
  type: TransactionType;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  currency?: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsUUID()
  recurringTransactionId?: string;
}
