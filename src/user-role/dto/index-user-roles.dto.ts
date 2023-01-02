import { IsNumber, IsOptional, IsString } from 'class-validator';

export class IndexUserRolesDTO {
  @IsOptional()
  @IsString()
  search: string;

  @IsNumber()
  perPage = 10;

  @IsNumber()
  currentPage = 1;
}
