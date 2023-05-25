import { Module, forwardRef } from '@nestjs/common';
import { MulterModule } from '@nestjs/platform-express';
import { SequelizeModule } from '@nestjs/sequelize';
import { diskStorage } from 'multer';
import { PermissionModule } from 'src/permission.module';
import { PersonModule } from 'src/person/person.module';
import { BlogController } from './blog.controller';
import { Blog } from './blog.model';
import { BlogService } from './blog.service';

const validMimetypes = ['image/png', 'image/jpeg'];

// @Global()
@Module({
  imports: [
    PermissionModule.register('blogs'),
    forwardRef(() => PersonModule),
    SequelizeModule.forFeature([Blog]),
    MulterModule.register({
      storage: diskStorage({
        destination(req, file, callback) {
          callback(null, 'upload');
        },
        filename(req, file, callback) {
          callback(null, file.originalname);
        },
      }),
      fileFilter(req, file, callback) {
        if (validMimetypes.includes(file.mimetype)) callback(null, true);
        else callback(null, false);
      },
    }),
  ],
  controllers: [BlogController],
  providers: [
    BlogService,
    /* {
      provide: BlogService,
      useClass: BlogService,
    }, */
    /* {
      provide: 'MODULE_NAME',
      useValue: 'blogs',
    },
    permissionProvider, */
  ],
  exports: [BlogService],
})
export class BlogModule {}
