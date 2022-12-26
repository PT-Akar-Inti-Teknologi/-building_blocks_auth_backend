import { IsEnum, IsString, MaxLength, MinLength } from 'class-validator';
import { EnumRoleStatus } from '../../database/entities/user_roles.entity';
import { UserRolesAccessesDTO } from './user-roles-accesses.dto';

export class UpdateUserRolesDTO {
  @IsString()
  @MinLength(1)
  @MaxLength(300)
  name: string;

  @IsEnum(EnumRoleStatus)
  status: EnumRoleStatus;

  is_all_access: boolean;

  module_permissions: UserRolesAccessesDTO[];
}
