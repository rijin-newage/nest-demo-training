import { CallHandler, ExecutionContext, NestInterceptor } from '@nestjs/common';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators';

export class BlogInterceptor implements NestInterceptor {
  constructor(private field: string) {}
  intercept(context: ExecutionContext, next: CallHandler): Observable<any> {
    console.log(context);
    console.log('Before...');

    // const now = Date.now();
    return next.handle().pipe(map((data) => ({ [this.field]: data })));
  }
}
