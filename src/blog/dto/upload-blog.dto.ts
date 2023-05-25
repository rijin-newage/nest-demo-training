import { ApiProperty } from '@nestjs/swagger';

export class UploadBlogDto {
  @ApiProperty({
    type: 'string',
    format: 'binary',
  })
  file: any;
}
