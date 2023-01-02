import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../base/service/service.base';
import { ModulesDocument } from '../database/entities/modules.entity';
import { Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class ModulesService extends ServiceBase<ModulesDocument> {
  private tableAlias = 'user_roles';

  constructor(
    @InjectRepository(ModulesDocument)
    public repository: Repository<ModulesDocument>,
  ) {
    super(repository);

    this.relations = ['sub_modules'];
  }

  public async findMany() {
    return await this.repository.find({ relations: this.relations });
  }
}
