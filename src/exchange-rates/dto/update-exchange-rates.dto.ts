import { ApiProperty } from "@nestjs/swagger";
import { IsDateString, IsObject, IsOptional } from "class-validator";

export class UpdateExchangeRatesDto {
  @ApiProperty({
    example: {
      UGX: { symbol: "USh", rate: 1 },
      USD: { symbol: "$", rate: 0.00027 }
    }
  })
  @IsObject()
  rates: Record<string, { symbol: string; rate: number }>;

  @ApiProperty({ required: false, example: "2026-01-31T00:00:00.000Z" })
  @IsOptional()
  @IsDateString()
  lastExchangeRateUpdate?: string;
}
