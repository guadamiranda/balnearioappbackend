import { IsString } from "class-validator";

export class FinishWorkshiftRequestDto {
    @IsString()
    observations: string;
}