import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { DatabaseService } from './database/database.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InternalModule } from './internal/internal.module';
import { SeederModule } from './database/seeders/seeder.module';
import { CommonModule } from './common/common.module';
import { BullModule } from '@nestjs/bull';
import { UserRolesModule } from './user-role/user-roles.module';
import { InternalUserRolesModule } from './internal/internal-user-roles/internal-user-roles.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forRootAsync({
      useClass: DatabaseService,
    }),
    BullModule.forRoot({
      redis: {
        host: process.env.REDIS_HOST,
        port: +process.env.REDIS_PORT,
        password: process.env.REDIS_PASSWORD,
      },
    }),
    InternalModule,
    SeederModule,
    CommonModule,
    UserRolesModule,
    InternalUserRolesModule,
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
