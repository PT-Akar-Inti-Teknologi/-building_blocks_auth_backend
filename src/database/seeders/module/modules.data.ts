export const modules = [
  {
    name: 'Dashboard',
    code: 'DASHBOARD',
    permissions: ['CREATE', 'DELETE', 'UPDATE', 'READ'],
    sub_modules: [],
  },
  {
    name: 'Permissions',
    code: 'PERMISSION',
    permissions: ['CREATE', 'DELETE', 'UPDATE', 'READ'],
    sub_modules: [
      {
        name: 'All Users',
        code: 'ALL_USERS',
        permissions: ['CREATE', 'DELETE', 'UPDATE', 'READ'],
        sub_modules: [],
      },
      {
        name: 'User Roles',
        code: 'USER_ROLES',
        permissions: ['CREATE', 'DELETE', 'UPDATE', 'READ'],
        sub_modules: [],
      },
    ],
  },
  {
    name: 'Home Menu',
    code: 'HOME_MENU',
    permissions: ['CREATE', 'DELETE', 'UPDATE', 'READ'],
    sub_modules: [],
  },
  {
    name: 'Manage Banner',
    code: 'MANAGE_BANNER',
    permissions: ['CREATE', 'DELETE', 'UPDATE', 'READ'],
    sub_modules: [
      {
        name: 'Category',
        code: 'CATEGORY',
        permissions: ['CREATE', 'DELETE', 'UPDATE', 'READ'],
        sub_modules: [],
      },
      {
        name: 'List',
        code: 'LIST',
        permissions: ['CREATE', 'DELETE', 'UPDATE', 'READ'],
        sub_modules: [],
      },
    ],
  },
];
