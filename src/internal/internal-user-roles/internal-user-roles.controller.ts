import { Controller, Get, Param } from '@nestjs/common';
import { ResponseSuccessSingleInterface } from 'src/response/response.interface';
import { ResponseService } from 'src/response/response.service';
import { UserRolesService } from 'src/user-role/user-roles.service';

@Controller('api/v1/internal/auth/user-roles')
export class InternalUserRolesController {
  constructor(
    private readonly userRoleService: UserRolesService,
    private readonly responseService: ResponseService,
  ) {}

  @Get(':role_id')
  async findOne(
    @Param('role_id') roleId: string,
  ): Promise<ResponseSuccessSingleInterface> {
    const userRole = await this.userRoleService.getAndValidate(roleId);
    return this.responseService.success(userRole);
  }
}
