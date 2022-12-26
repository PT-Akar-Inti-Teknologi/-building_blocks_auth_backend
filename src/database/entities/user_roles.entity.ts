import { Column, Entity, OneToMany, PrimaryGeneratedColumn } from 'typeorm';
import { ModelBase } from '../../base/model/model.base';
import { UserRoleAccessesDocument } from './user_role_accesses.entity';

export enum EnumRoleStatus {
  ACTIVE = 'ACTIVE',
  INACTIVE = 'INACTIVE',
}

@Entity({ name: 'auth_user_roles' })
export class UserRolesDocument extends ModelBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 300, nullable: false })
  name: string;

  @Column({
    type: 'enum',
    enum: EnumRoleStatus,
    default: EnumRoleStatus.ACTIVE,
  })
  status: EnumRoleStatus;

  @Column({ type: 'boolean', nullable: true })
  is_all_access: boolean;

  @OneToMany(() => UserRoleAccessesDocument, (model) => model.role, {
    cascade: ['insert', 'update', 'soft-remove'],
  })
  resource_accesses: UserRoleAccessesDocument[];
}
