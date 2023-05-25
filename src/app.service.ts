import { Injectable, Logger } from '@nestjs/common';

@Injectable()
export class AppService {
  private logger = new Logger('AppService');

  getHello(): string {
    this.logger.log('Test log');
    this.logger.debug('Test debug log');
    this.logger.warn('Test warn log');
    this.logger.error('Test error log');
    return 'Hello World!';
  }
}
