import { PartialType } from '@nestjs/swagger';
import { IsString, Min, Max, IsPositive, IsDefined, IsOptional } from 'class-validator';

export class CreateCardDto {

    @IsDefined({ message: 'Card name is required' })
    @IsString()
    cardName: string;

    @IsDefined({ message: 'Card limit is required' })
    @IsPositive({ message: 'Card limit must be > 0' })
    cardLimit: number;

    @IsDefined({ message: 'Due day is required' })
    @IsPositive() @Min(1) @Max(28)
    dueDay: number;

    @IsPositive()
    @IsOptional()
    limitAvailable?: number;

}

export class UpdateCardDto extends PartialType(CreateCardDto){}
