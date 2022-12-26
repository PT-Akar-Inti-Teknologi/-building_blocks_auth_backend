import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ModulesSeederService } from './modules.service';
import { ModulesDocument } from '../../entities/modules.entity';

/**
 * Import and provide seeder classes for countrys.
 *
 * @module
 */
@Module({
  imports: [TypeOrmModule.forFeature([ModulesDocument])],
  providers: [ModulesSeederService],
  exports: [ModulesSeederService],
})
export class ModulesSeederModule {}
