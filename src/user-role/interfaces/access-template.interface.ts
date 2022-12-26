export interface AccessTemplateInterface {
  name: string;

  code: string;

  no_action: boolean;

  permissions: string[];

  sub_accesses: AccessTemplateInterface[];
}
