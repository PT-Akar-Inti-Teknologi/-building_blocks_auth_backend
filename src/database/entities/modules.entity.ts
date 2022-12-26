import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ModelBase } from '../../base/model/model.base';
import { UserRoleAccessesDocument } from './user_role_accesses.entity';

@Entity({ name: 'auth_modules' })
export class ModulesDocument extends ModelBase {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ length: 300, nullable: false })
  name: string;

  @Column({ length: 300, nullable: false })
  code: string;

  @Column({ type: 'json', default: [] })
  permissions: string[];

  @OneToMany(() => ModulesDocument, (model) => model.parent, {
    cascade: ['insert', 'soft-remove', 'update'],
  })
  sub_modules: ModulesDocument[];

  @Column({ type: 'string', nullable: true })
  parent_id: string;

  @ManyToOne(() => ModulesDocument, (model) => model.sub_modules, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  @JoinColumn({ name: 'parent_id' })
  parent: ModulesDocument;

  @OneToMany(() => UserRoleAccessesDocument, (model) => model.module, {
    onUpdate: 'CASCADE',
    onDelete: 'CASCADE',
  })
  module_permissions: UserRoleAccessesDocument[];
}
