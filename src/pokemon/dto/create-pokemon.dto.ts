import {
  IsString,
  MinLength,
  IsNumber,
  Min,
  IsPositive,
} from 'class-validator';

export class CreatePokemonDto {
  @IsNumber()
  @Min(1)
  @IsPositive()
  no: number;
  @IsString()
  @MinLength(2)
  name: string;
}
