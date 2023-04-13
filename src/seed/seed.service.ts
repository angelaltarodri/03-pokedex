import { Injectable } from '@nestjs/common';
import { PokeResponse } from './interfaces/poke-response.interface';
import { InjectModel } from '@nestjs/mongoose';
import { Pokemon } from 'src/pokemon/entities/pokemon.entity';
import { Model } from 'mongoose';
import { AxiosAdapter } from 'src/common/adapters/axios.adapter';

@Injectable()
export class SeedService {
  constructor(
    @InjectModel(Pokemon.name)
    private readonly pokemonModel: Model<Pokemon>,
    private readonly http: AxiosAdapter,
  ) {}

  // Para llegar acá se tuvo que inyectar el pokemonModel con su @InjectModel
  // Aparte, exportar el MongooseModule e importar el PokemonModule
  async executeSeed() {
    await this.pokemonModel.deleteMany({}); // delete * from pokemons;

    const data = await this.http.get<PokeResponse>(
      `https://pokeapi.co/api/v2/pokemon?limit=650`,
    );

    const pokemonToInsert: { name: string; no: number }[] = [];

    data.results.forEach(async ({ name, url }) => {
      const segments = url.split('/');
      const no = +segments[segments.length - 2];

      // const pokemon = await this.pokemonModel.create({ name, no });
      pokemonToInsert.push({ name, no });
    });

    // insert into pokemons (name, no)
    // (name: bulbasaur, no: 1)
    await this.pokemonModel.insertMany(pokemonToInsert);

    return `Seed executed.`;
  }
}
