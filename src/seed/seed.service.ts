import { Injectable } from '@nestjs/common';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';
import { CreatePokemonDto } from 'src/pokemon/dto/create-pokemon.dto';
import { PokemonService } from 'src/pokemon/pokemon.service';
import { PokeResponse } from './interfaces/poke-response.interface';

@Injectable()
export class SeedService {
  constructor(
    private readonly pokemonService: PokemonService,
    private readonly httpAdapter: AxiosAdapter,
  ) {}

  async populateDatabase() {
    const data = await this.httpAdapter.get<PokeResponse>(
      'https://pokeapi.co/api/v2/pokemon?limit=600',
    );

    const pokemonsToCreate: CreatePokemonDto[] = data.results.map(
      ({ name, url }) => {
        const segments = url.split('/');
        const no = +segments[segments.length - 2];
        return {
          name,
          no,
        };
      },
    );

    await this.pokemonService.createMany(pokemonsToCreate);

    return 'seed executed';
  }
}
