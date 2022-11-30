import { Module } from '@nestjs/common';
import { MongooseModule } from '@nestjs/mongoose';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { PokemonModule } from './pokemon/pokemon.module';
import { CommonModule } from './common/common.module';
import { SeedModule } from './seed/seed.module';
import { ConfigModule } from '@nestjs/config';
import { Properties } from './config/properties.config';
import { PropertiesValidationSchema } from './config/properties.joi.config';

@Module({
  imports: [
    ConfigModule.forRoot({
      load: [Properties],
      validationSchema: PropertiesValidationSchema,
    }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'public'),
    }),
    MongooseModule.forRoot(process.env.DATABASE_URL),
    PokemonModule,
    CommonModule,
    SeedModule,
  ],
  providers: [],
})
export class AppModule {}
