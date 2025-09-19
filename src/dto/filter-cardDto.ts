import { IsOptional } from "class-validator";

export class FilterCardDTO {

    @IsOptional()
    cardName: string;

    @IsOptional()
    cardLimit: number;

    @IsOptional()
    dueDay: number;
}