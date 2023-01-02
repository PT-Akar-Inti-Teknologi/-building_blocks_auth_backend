import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { ModulesDocument } from '../../entities/modules.entity';
import { modules } from './modules.data';

@Injectable()
export class ModulesSeederService {
  constructor(
    @InjectRepository(ModulesDocument)
    private readonly modulesRepository: Repository<ModulesDocument>,
  ) {}

  create(): Array<Promise<ModulesDocument>> {
    return modules.map(async (modules) => {
      return await this.modulesRepository
        .findOne({ name: modules.name })
        .then(async (findOne) => {
          if (findOne) {
            return Promise.resolve(null);
          }

          const create = this.modulesRepository.create(modules);

          return await this.modulesRepository.save(create);
        })
        .catch((error) => Promise.reject(error));
    });
  }
}
