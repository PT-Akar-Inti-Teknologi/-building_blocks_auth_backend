import {
  BadRequestException,
  HttpStatus,
  Injectable,
  Logger,
} from '@nestjs/common';
import { ServiceBase } from '../base/service/service.base';
import { UserRolesDocument } from '../database/entities/user_roles.entity';
import { IndexUserRolesDTO } from './dto/index-user-roles.dto';
import { Repository, SelectQueryBuilder } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { QueryBuilderPaginationUtils } from '../utils/query-builder-pagination.utils';
import { PaginationTransformer } from '../base/transformers/index.transformer';
import { removeAllFieldPassword } from 'src/utils/general.utils';
import { ResponseService } from 'src/response/response.service';
import { MessageService } from 'src/message/message.service';

@Injectable()
export class UserRolesService extends ServiceBase<UserRolesDocument> {
  private tableAlias = 'user_roles';

  constructor(
    @InjectRepository(UserRolesDocument)
    public repository: Repository<UserRolesDocument>,
    private readonly responseService: ResponseService,
    private readonly messageService: MessageService,
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

  async getAndValidate(userRoleId: string): Promise<UserRolesDocument> {
    try {
      const userRole = await this.findOne(userRoleId);
      if (!userRole) {
        throw new BadRequestException(
          this.responseService.error(
            HttpStatus.BAD_REQUEST,
            [
              this.messageService.getErrorMessage(
                'user_role_id',
                'user_role.id.not_found',
              ),
            ],
            'Bad Request',
          ),
        );
      }
      removeAllFieldPassword(userRole);
      return userRole;
    } catch (error) {
      Logger.error(error.message, '', this.constructor.name);
      this.responseService.throwError(error);
    }
  }
}
