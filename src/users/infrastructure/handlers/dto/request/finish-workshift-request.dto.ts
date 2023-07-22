import { IsString } from "class-validator";

export class finishWorkshiftRequestDto {
    @IsString()
    observations: string;
}