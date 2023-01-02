import { UserRolesController } from './user-roles.controller';
import { Test, TestingModule } from '@nestjs/testing';

import { MockFunctionMetadata, ModuleMocker } from 'jest-mock';
import { UserRolesService } from './user-roles.service';
import { CreateUserRolesDTO } from './dto/create-user-roles.dto';
import {
  EnumRoleStatus,
  UserRolesDocument,
} from '../database/entities/user_roles.entity';
import { UpdateUserRolesDTO } from './dto/update-user-roles.dto';
import { IndexUserRolesDTO } from './dto/index-user-roles.dto';
import { PaginationTransformer } from '../base/transformers/index.transformer';

const moduleMocker = new ModuleMocker(global);

const exampleData: Partial<UserRolesDocument> = {
  id: '00001',
  name: 'test',
};

const createDTO: CreateUserRolesDTO = {
  name: 'test',
  is_all_access: false,
  module_permissions: [],
  status: EnumRoleStatus.ACTIVE,
};

const updateDTO: UpdateUserRolesDTO = {
  name: 'test',
  is_all_access: false,
  module_permissions: [],
  status: EnumRoleStatus.ACTIVE,
};

const indexDTO: IndexUserRolesDTO = {
  perPage: 10,
  search: 'test',
  currentPage: 1,
};

const paginateExampleData: PaginationTransformer<UserRolesDocument> = {
  items: [],
  total_item: 0,
  limit: 10,
  current_page: 1,
};

describe('UserRolesController', () => {
  let controller: UserRolesController;

  let service: UserRolesService;

  const ApiServiceProvider = {
    provide: UserRolesService,
    useFactory: () => ({
      save: jest.fn().mockReturnValue(exampleData),
      update: jest.fn().mockReturnValue(exampleData),
      delete: jest.fn(),
      findOne: jest.fn().mockReturnValue(exampleData),
      paginate: jest.fn().mockReturnValue(paginateExampleData),
    }),
  };

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [UserRolesController],
      providers: [UserRolesService, ApiServiceProvider],
    })
      .useMocker((token) => {
        if (typeof token === 'function') {
          const mockMetadata = moduleMocker.getMetadata(
            token,
          ) as MockFunctionMetadata<any, any>;
          const Mock = moduleMocker.generateFromMetadata(mockMetadata);
          return new Mock();
        }
      })
      .compile();

    controller = module.get<UserRolesController>(UserRolesController);

    service = module.get<UserRolesService>(UserRolesService);
  });

  it('Controller Should Be Define', () => {
    expect(controller).toBeDefined();
  });

  it('Calling store function', () => {
    controller.store(createDTO);

    expect(controller.store(createDTO)).not.toEqual(null);
  });

  it('Calling service from store function', () => {
    controller.store(createDTO);

    expect(service.save).toHaveBeenCalled();

    expect(service.save).toHaveBeenCalledWith(createDTO);
  });

  it('Calling update function', () => {
    controller.update(exampleData.id, updateDTO);

    expect(controller.update(exampleData.id, updateDTO)).not.toEqual(null);
  });

  it('Calling service from update function', () => {
    controller.update(exampleData.id, updateDTO);

    expect(service.update).toHaveBeenCalled();

    expect(service.update).toHaveBeenCalledWith(updateDTO);
  });

  it('Calling paginate function', () => {
    controller.index(indexDTO);

    expect(controller.index(indexDTO)).not.toEqual(null);
  });

  it('Calling service from index function', () => {
    controller.index(indexDTO);

    expect(service.paginate).toHaveBeenCalled();

    expect(service.paginate).toHaveBeenCalledWith(indexDTO);
  });

  it('Calling show function', () => {
    controller.show(exampleData.id);

    expect(controller.show(exampleData.id)).not.toEqual(null);
  });

  it('Calling service from show function', () => {
    controller.show(exampleData.id);

    expect(service.findOne).toHaveBeenCalled();

    expect(service.findOne).toHaveBeenCalledWith(exampleData.id);
  });

  it('Calling delete function', () => {
    controller.delete(exampleData.id);

    expect(controller.delete(exampleData.id)).not.toEqual(null);
  });

  it('Calling service from delete function', () => {
    controller.delete(exampleData.id);

    expect(service.delete).toHaveBeenCalled();

    expect(service.delete).toHaveBeenCalledWith(exampleData.id);
  });
});
