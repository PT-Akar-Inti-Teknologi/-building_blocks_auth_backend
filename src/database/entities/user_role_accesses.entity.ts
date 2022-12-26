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

@Entity({ name: 'auth_user_role_accesses' })
export class UserRoleAccessesDocument extends ModelBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 300, nullable: false })
  name: string;

  @Column({ length: 300, nullable: false })
  code: string;

  @Column({ type: 'json', default: [] })
  permissions: string[];

  @OneToMany(() => UserRoleAccessesDocument, (model) => model.parent_access, {
    cascade: ['insert', 'soft-remove', 'update'],
  })
  sub_accesses: UserRoleAccessesDocument[];

  @Column({ type: 'string', nullable: true })
  parent_access_id: string;

  @ManyToOne(() => UserRoleAccessesDocument, (model) => model.sub_accesses, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_access_id' })
  parent_access: UserRoleAccessesDocument;

  @Column({ type: 'string', nullable: true })
  role_id: string;

  @ManyToOne(() => UserRolesDocument, (model) => model.resource_accesses, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'role_id' })
  role: UserRolesDocument;
}
