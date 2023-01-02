import { Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Seeder } from './seeder';
import { ModulesDocument } from '../entities/modules.entity';
import { ModulesSeederModule } from './module/modules.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([ModulesDocument]),
    ModulesSeederModule,
  ],
  providers: [Logger, Seeder],
})
export class SeederModule {}
