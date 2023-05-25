import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';

const BLOG_CREATE_PERMISSION = true;

export class BlogGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    /* request.user = {
      id: 1,
      name: 'Demo User',
    }; */
    return BLOG_CREATE_PERMISSION;
  }
}
