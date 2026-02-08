import { ApiProperty } from "@nestjs/swagger";
import { IsString } from "class-validator";

export class UpdateUserSettingsDto {
  @ApiProperty({ example: "UGX" })
  @IsString()
  currency: string;

  @ApiProperty({ example: "0.00" })
  @IsString()
  startingBalance: string;

  @ApiProperty({ example: "0.00" })
  @IsString()
  currentBalance: string;
}
