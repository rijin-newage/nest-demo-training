import {
  Body,
  Controller,
  Get,
  HttpStatus,
  Inject,
  Param,
  ParseFilePipeBuilder,
  ParseIntPipe,
  Post,
  UploadedFile,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';
import { FileInterceptor } from '@nestjs/platform-express';
import { ApiBearerAuth, ApiBody, ApiConsumes, ApiTags } from '@nestjs/swagger';
import { PersonService } from 'src/person/person.service';
import { BlogGuard } from './blog.guard';
import { BlogService } from './blog.service';
import { CreateBlogDto } from './dto/create-blog.dto';
import { UploadBlogDto } from './dto/upload-blog.dto';

@ApiTags('blog')
@ApiBearerAuth()
@Controller('blog')
@UseGuards(BlogGuard)
export class BlogController {
  constructor(
    private readonly blogService: BlogService,
    private readonly personService: PersonService,
    @Inject('MODULE_NAME') moduleName: string,
    @Inject('PERMISSIONS') permissions: string[],
  ) {
    console.log('BlogController');
    console.log('MODULE_NAME: ', moduleName);
    console.log('PERMISSIONS: ', permissions);
  }

  /* @Get()
  // @HttpCode(201)
  @UseInterceptors(new BlogInterceptor('blogs'))
  getBlogs(
    @Req() request: Request,
    // @Res() response: Response,
    @Query('search', new DefaultValuePipe('')) search: string,
    @Query('ids', ParseIdsPipe) ids: number[],
    @User('id') userId: number,
  ) {
    // console.log(search);
    // console.log('ids: ', ids);
    console.log(userId);
    console.log('controller running');
    return this.blogService.getBlogs(search);
  } */

  @Get(':blogId')
  getBlogDetails(@Param('blogId', ParseIntPipe) blogId: number) {
    return this.blogService.getBlogDetails(blogId);
  }

  @Post()
  // @UseGuards(BlogGuard)
  createBlog(@Body(/* new ValidationPipe() */) body: CreateBlogDto) {
    return this.blogService.create(body);
  }

  @Get()
  getAll() {
    return this.blogService.getAll();
  }

  @Post('upload')
  @ApiConsumes('multipart/form-data')
  @ApiBody({
    description: 'File upload',
    type: UploadBlogDto,
  })
  @UseInterceptors(FileInterceptor('file'))
  upload(
    @UploadedFile(
      new ParseFilePipeBuilder()
        .addFileTypeValidator({
          fileType: /(jpg|jpeg|png|gif)$/,
        })
        .addMaxSizeValidator({
          maxSize: 10 * 1024,
        })
        .build({
          errorHttpStatusCode: HttpStatus.UNPROCESSABLE_ENTITY,
        }),
    )
    file: Express.Multer.File,
  ) {
    console.log(file);
    return 'Ok';
  }
}
