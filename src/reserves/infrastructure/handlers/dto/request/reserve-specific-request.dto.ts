import { IsOptional, IsString } from 'class-validator';

export class SpecificReserveQueryDto {
  @IsOptional()
  @IsString()
  dni?: string;

  @IsOptional()
  @IsString()
  carplate?: string;

  @IsString()
  membernumber?: string;
}