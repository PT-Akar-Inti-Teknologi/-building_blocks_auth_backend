export class UserRolesAccessesDTO {
  name: string;

  code: string;

  permissions: string[];

  sub_accesses: UserRolesAccessesDTO[];
}
