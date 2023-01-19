import { BadRequestException, Controller, Get, Query } from '@nestjs/common';
import { UserRolesService } from './user-roles.service';
import { CreateUserRolesDTO } from './dto/create-user-roles.dto';
import { BaseController } from '../base/controller/controller.base';
import { UpdateUserRolesDTO } from './dto/update-user-roles.dto';
import { MessageService } from '../message/message.service';
import { ResponseService } from '../response/response.service';
import { IndexUserRolesDTO } from './dto/index-user-roles.dto';
import { PaginationTransformer } from '../base/transformers/index.transformer';
import { UserRolesDocument } from '../database/entities/user_roles.entity';
import { accessTemplate } from './templates/user-role-access-template.data';
import { ModulesService } from './modules.service';

@Controller('api/v1/auth/user-roles')
export class UserRolesController extends BaseController<
  CreateUserRolesDTO,
  UpdateUserRolesDTO,
  UserRolesDocument
> {
  constructor(
    private readonly userRolesService: UserRolesService,
    private readonly modulesService: ModulesService,
    private readonly messageService: MessageService,
    private readonly responseService: ResponseService,
  ) {
    super(
      userRolesService,
      messageService,
      responseService,
      UserRolesController.name,
    );
  }

  @Get()
  async index(@Query() params: IndexUserRolesDTO) {
    try {
      const result: PaginationTransformer<UserRolesDocument> =
        await this.userRolesService.paginate(params);

      return this.responseService.successCollection(
        result.items,
        {
          page: result.current_page,
          size: result.limit,
          total: result.total_item,
        },
        this.messageService.get('general.list.success'),
      );
    } catch (e) {
      this.logger.error(e.message);

      throw new BadRequestException(e.message);
    }
  }

  @Get('/access-template')
  async getAccessTemplate() {
    return this.responseService.success(
      await this.modulesService.findMany(),
      this.messageService.get('general.list.success'),
    );
  }
}
