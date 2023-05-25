import { IsString } from 'class-validator';

export class CreateBlogDto {
  id: number;

  @IsString()
  title: string;

  @IsString()
  content: string;
}
