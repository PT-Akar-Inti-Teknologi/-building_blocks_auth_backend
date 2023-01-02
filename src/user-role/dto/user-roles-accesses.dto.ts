export class UserRolesAccessesDTO {
  module_id: string;

  active_permissions: string[];

  sub_module_permissions: UserRolesAccessesDTO[];
}
