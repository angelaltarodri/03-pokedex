import { Module } from '@nestjs/common';
import { SeedService } from './seed.service';
import { SeedController } from './seed.controller';
import { PokemonModule } from 'src/pokemon/pokemon.module';
import { CommonModule } from 'src/common/common.module';

@Module({
  controllers: [SeedController],
  providers: [SeedService],
  // Para importar el MongooseModel se escribe el Pokemon Module
  // Para implementar el AxiosAdapter se escribe el CommonModule
  imports: [PokemonModule, CommonModule],
})
export class SeedModule {}
