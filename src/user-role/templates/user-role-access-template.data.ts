import { AccessTemplateInterface } from '../interfaces/access-template.interface';
import { AccessActionEnum } from '../enums/access-action.enum';

export const defaultAccess = [
  AccessActionEnum.CREATE,
  AccessActionEnum.DELETE,
  AccessActionEnum.UPDATE,
  AccessActionEnum.READ,
];

export const accessTemplate: AccessTemplateInterface[] = [
  generateTemplate('Dashboard', 'DASHBOARD', false, defaultAccess),
  generateTemplate('Permissions', 'PERMISSION', true, defaultAccess, [
    generateTemplate('All Users', 'ALL_USERS', false, defaultAccess),
    generateTemplate('User Roles', 'USER_ROLES', false, defaultAccess),
  ]),
  generateTemplate('Home Menu', 'HOME_MENU', false, defaultAccess),
  generateTemplate('Manage Banner', 'MANAGE_BANNER', true, defaultAccess, [
    generateTemplate('Category', 'CATEGORY', false, defaultAccess),
    generateTemplate('List', 'LIST', false, defaultAccess),
  ]),
];

export function generateTemplate(
  name: string,
  code: string,
  no_action: boolean,
  permissions: string[],
  sub_accesses: AccessTemplateInterface[] = [],
): AccessTemplateInterface {
  return {
    name,
    code,
    no_action,
    permissions,
    sub_accesses,
  };
}
