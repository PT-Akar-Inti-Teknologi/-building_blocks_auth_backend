import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModelBase } from '../../base/model/model.base';
import { UserRolesDocument } from './user_roles.entity';
import { ModulesDocument } from './modules.entity';

@Entity({ name: 'auth_role_module_permissions' })
export class UserRoleAccessesDocument extends ModelBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: 'varchar', nullable: true })
  module_id: string;

  @ManyToOne(() => ModulesDocument, (model) => model.module_permissions)
  @JoinColumn({ name: 'module_id' })
  module: ModulesDocument;

  @Column({ type: 'json', default: [] })
  active_permissions: string[];

  @OneToMany(() => UserRoleAccessesDocument, (model) => model.parent, {
    cascade: ['insert', 'soft-remove', 'update'],
  })
  sub_module_permissions: UserRoleAccessesDocument[];

  @Column({ type: 'string', nullable: true })
  parent_id: string;

  @ManyToOne(
    () => UserRoleAccessesDocument,
    (model) => model.sub_module_permissions,
    {
      onUpdate: 'CASCADE',
      onDelete: 'CASCADE',
    },
  )
  @JoinColumn({ name: 'parent_id' })
  parent: UserRoleAccessesDocument;

  @Column({ type: 'string', nullable: true })
  role_id: string;

  @ManyToOne(() => UserRolesDocument, (model) => model.module_permissions, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: UserRolesDocument;
}
