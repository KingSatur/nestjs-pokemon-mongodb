import { Injectable } from '@nestjs/common';
import {
  BadRequestException,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common/exceptions';
import { InjectModel } from '@nestjs/mongoose';
import { isValidObjectId, Model } from 'mongoose';
import { isContext } from 'vm';
import { CreatePokemonDto } from './dto/create-pokemon.dto';
import { UpdatePokemonDto } from './dto/update-pokemon.dto';
import { Pokemon } from './entities/pokemon.entity';

@Injectable()
export class PokemonService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
  ) {}

  async create(createPokemonDto: CreatePokemonDto) {
    createPokemonDto.name = createPokemonDto.name.toLowerCase();

    try {
      const pokemonEntity = await this.pokemonModel.create(createPokemonDto);
      return pokemonEntity;
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  findAll() {
    return `This action returns all pokemon`;
  }

  async findOne(term: string) {
    let pokemonEntity: Pokemon;
    if (!isNaN(+term)) {
      pokemonEntity = await this.pokemonModel.findOne({
        no: term,
      });
    }

    if (!pokemonEntity && isValidObjectId(term)) {
      pokemonEntity = await this.pokemonModel.findById(term);
    }

    if (!pokemonEntity) {
      pokemonEntity = await this.pokemonModel.findOne({
        name: term.toLowerCase().trim(),
      });
    }

    if (!pokemonEntity) {
      throw new NotFoundException(
        `Pokemon with id, name or no ${term} was not found`,
      );
    }

    return pokemonEntity;
  }

  async update(id: string, updatePokemonDto: UpdatePokemonDto) {
    try {
      const pokemon = await this.findOne(id);

      if (updatePokemonDto.name) {
        updatePokemonDto.name = updatePokemonDto.name.toLowerCase();
      }

      const updatedPokemon = await pokemon.updateOne(updatePokemonDto, {
        new: true,
      });

      return {
        ...pokemon.toJSON(),
        ...updatePokemonDto,
      };
    } catch (error) {
      this.handleExceptions(error);
    }
  }

  async remove(id: string) {
    await this.pokemonModel.findByIdAndDelete(id);
  }

  private handleExceptions(error: any) {
    if (error?.code === 11000) {
      throw new BadRequestException(
        `Pokemon exists in db ${JSON.stringify(error?.keyValue)}`,
      );
    }
    throw new InternalServerErrorException('Cant operate pokemon');
  }
}
