import { Expose } from 'class-transformer';
import { IsNotEmpty, IsOptional, IsString } from 'class-validator';

export class CreateTaskDto {
  @IsNotEmpty()
  @Expose()
  title: string;

  @IsOptional()
  @Expose()
  description?: string;

  @IsOptional()
  @Expose()
  completed?: boolean;

  @IsOptional()
  @IsString()
  @IsNotEmpty()
  @Expose()
  // @Transform((params) => params.obj._id.toString())
  category?: string;
}
