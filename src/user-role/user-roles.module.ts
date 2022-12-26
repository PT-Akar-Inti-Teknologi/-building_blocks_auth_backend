import { Module } from '@nestjs/common';
import { UserRolesController } from './user-roles.controller';
import { MessageService } from 'src/message/message.service';
import { ResponseService } from 'src/response/response.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesService } from './user-roles.service';
import { UserRolesDocument } from '../database/entities/user_roles.entity';
import { UserRoleAccessesDocument } from '../database/entities/user_role_accesses.entity';

@Module({
  imports: [
    TypeOrmModule.forFeature([UserRolesDocument, UserRoleAccessesDocument]),
  ],
  controllers: [UserRolesController],
  providers: [MessageService, ResponseService, UserRolesService],
})
export class UserRolesModule {}
