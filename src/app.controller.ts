import { Controller, Get, Inject, Post } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { AppService } from './app.service';
// import { BlogService } from './blog/blog.service';

@Controller()
export class AppController {
  constructor(
    private readonly appService: AppService, // private readonly blogService: BlogService,
    @Inject('MODULE_NAME') moduleName: string,
    @Inject('PERMISSIONS') permissions: string[],
    config: ConfigService,
  ) {
    console.log('AppController');
    console.log('MODULE_NAME: ', moduleName);
    console.log('PERMISSIONS: ', permissions);
    console.log('env: ', config.get('env'));
    console.log('port: ', config.get('port'));
    console.log('database: ', config.get('database.host'));
  }

  @Get()
  // @HttpCode(201)
  getHello(): string {
    // const blogs = this.blogService.getBlogs();
    // console.log(blogs);
    return this.appService.getHello();
  }

  @Post()
  postDemo() {
    return 'Success';
  }
}
