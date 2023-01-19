import { Test, TestingModule } from '@nestjs/testing';
import { UserRolesService } from 'src/user-role/user-roles.service';
import { InternalUserRolesController } from './internal-user-roles.controller';
describe('InternalUserRolesController', () => {
  let controller: InternalUserRolesController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [InternalUserRolesController],
      providers: [UserRolesService],
    }).compile();

    controller = module.get<InternalUserRolesController>(
      InternalUserRolesController,
    );
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
