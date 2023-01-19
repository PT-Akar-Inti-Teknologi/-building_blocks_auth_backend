import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserRolesDocument } from 'src/database/entities/user_roles.entity';
import { MessageService } from 'src/message/message.service';
import { ResponseService } from 'src/response/response.service';
import { UserRolesService } from 'src/user-role/user-roles.service';
import { InternalUserRolesController } from './internal-user-roles.controller';

@Module({
  imports: [TypeOrmModule.forFeature([UserRolesDocument])],
  controllers: [InternalUserRolesController],
  providers: [UserRolesService, ResponseService, MessageService],
})
export class InternalUserRolesModule {}
