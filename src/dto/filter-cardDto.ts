import { IsNumber, IsOptional, IsString } from "class-validator";

export class FilterCardDTO {

    @IsOptional()
    @IsString()
    cardName: string;

    @IsOptional()
    @IsNumber()
    cardLimit: number;

    @IsOptional()
    @IsNumber()
    dueDay: number;
}