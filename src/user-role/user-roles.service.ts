import { Injectable } from '@nestjs/common';
import { ServiceBase } from '../base/service/service.base';
import { UserRolesDocument } from '../database/entities/user_roles.entity';
import { IndexUserRolesDTO } from './dto/index-user-roles.dto';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilderPaginationUtils } from '../utils/query-builder-pagination.utils';
import { PaginationTransformer } from '../base/transformers/index.transformer';

@Injectable()
export class UserRolesService extends ServiceBase<UserRolesDocument> {
  private tableAlias = 'user_roles';

  constructor(
    @InjectRepository(UserRolesDocument)
    public repository: Repository<UserRolesDocument>,
  ) {
    super(repository);

    this.relations = [
      'module_permissions',
      'module_permissions.module',
      'module_permissions.sub_module_permissions',
      'module_permissions.sub_module_permissions.module',
    ];
  }

  async paginate(
    params: IndexUserRolesDTO,
  ): Promise<PaginationTransformer<UserRolesDocument>> {
    const query: SelectQueryBuilder<UserRolesDocument> =
      this.repository.createQueryBuilder(this.tableAlias);

    if (params.search) {
      query.where(`${this.tableAlias}.name ilike :search`, {
        search: `%${params.search}%`,
      });
    }

    return await new QueryBuilderPaginationUtils<UserRolesDocument>().generatePagination(
      query,
      params.perPage,
      params.currentPage,
    );
  }
}
