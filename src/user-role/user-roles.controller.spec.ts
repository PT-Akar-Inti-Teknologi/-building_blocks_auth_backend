// import { UserRolesController } from './user-roles.controller';
// import { Test, TestingModule } from '@nestjs/testing';
//
// import { ModuleMocker, MockFunctionMetadata } from 'jest-mock';
// import { UserRolesService } from './user-roles.service';
// import { CreateUserRolesDto } from './dto/create-user-roles.dto';
// import { SectionTypesDocument } from '../database/entities/section_types.entity';
// import { UpdateUserRolesDto } from './dto/update-user-roles.dto';
// import { IndexUserRolesDto } from './dto/index-user-roles.dto';
// import { PaginationTransformer } from '../base/transformers/index.transformer';
//
// const moduleMocker = new ModuleMocker(global);
//
// const exampleData: Partial<SectionTypesDocument> = {
//   id: '00001',
//   name: 'test',
// };
//
// const createDTO: CreateUserRolesDto = {
//   name: 'test',
// };
//
// const updateDTO: UpdateUserRolesDto = {
//   name: 'test',
// };
//
// const indexDTO: IndexUserRolesDto = {
//   perPage: 10,
//   search: 'test',
//   currentPage: 1,
// };
//
// const paginateExampleData: PaginationTransformer<SectionTypesDocument> = {
//   items: [],
//   total_item: 0,
//   limit: 10,
//   current_page: 1,
// };
//
// describe('SectionTypesController', () => {
//   let controller: UserRolesController;
//
//   let service: UserRolesService;
//
//   const ApiServiceProvider = {
//     provide: UserRolesService,
//     useFactory: () => ({
//       save: jest.fn().mockReturnValue(exampleData),
//       update: jest.fn().mockReturnValue(exampleData),
//       delete: jest.fn(),
//       findOne: jest.fn().mockReturnValue(exampleData),
//       paginate: jest.fn().mockReturnValue(paginateExampleData),
//     }),
//   };
//
//   beforeEach(async () => {
//     const module: TestingModule = await Test.createTestingModule({
//       controllers: [UserRolesController],
//       providers: [UserRolesService, ApiServiceProvider],
//     })
//       .useMocker((token) => {
//         if (typeof token === 'function') {
//           const mockMetadata = moduleMocker.getMetadata(
//             token,
//           ) as MockFunctionMetadata<any, any>;
//           const Mock = moduleMocker.generateFromMetadata(mockMetadata);
//           return new Mock();
//         }
//       })
//       .compile();
//
//     controller = module.get<UserRolesController>(UserRolesController);
//
//     service = module.get<UserRolesService>(UserRolesService);
//   });
//
//   it('Controller Should Be Define', () => {
//     expect(controller).toBeDefined();
//   });
//
//   it('Calling store function', () => {
//     controller.store(createDTO);
//
//     expect(controller.store(createDTO)).not.toEqual(null);
//   });
//
//   it('Calling service from store function', () => {
//     controller.store(createDTO);
//
//     expect(service.save).toHaveBeenCalled();
//
//     expect(service.save).toHaveBeenCalledWith(createDTO);
//   });
//
//   it('Calling update function', () => {
//     controller.update(exampleData.id, updateDTO);
//
//     expect(controller.update(exampleData.id, updateDTO)).not.toEqual(null);
//   });
//
//   it('Calling service from update function', () => {
//     controller.update(exampleData.id, updateDTO);
//
//     expect(service.update).toHaveBeenCalled();
//
//     expect(service.update).toHaveBeenCalledWith(updateDTO);
//   });
//
//   it('Calling paginate function', () => {
//     controller.index(indexDTO);
//
//     expect(controller.index(indexDTO)).not.toEqual(null);
//   });
//
//   it('Calling service from index function', () => {
//     controller.index(indexDTO);
//
//     expect(service.paginate).toHaveBeenCalled();
//
//     expect(service.paginate).toHaveBeenCalledWith(indexDTO);
//   });
//
//   it('Calling show function', () => {
//     controller.show(exampleData.id);
//
//     expect(controller.show(exampleData.id)).not.toEqual(null);
//   });
//
//   it('Calling service from show function', () => {
//     controller.show(exampleData.id);
//
//     expect(service.findOne).toHaveBeenCalled();
//
//     expect(service.findOne).toHaveBeenCalledWith(exampleData.id);
//   });
//
//   it('Calling delete function', () => {
//     controller.delete(exampleData.id);
//
//     expect(controller.delete(exampleData.id)).not.toEqual(null);
//   });
//
//   it('Calling service from delete function', () => {
//     controller.delete(exampleData.id);
//
//     expect(service.delete).toHaveBeenCalled();
//
//     expect(service.delete).toHaveBeenCalledWith(exampleData.id);
//   });
// });
