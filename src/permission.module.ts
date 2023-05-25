import { DynamicModule, Module } from '@nestjs/common';
import { permissionProvider } from './permission.provider';

@Module({})
export class PermissionModule {
  static register(moduleName: string): DynamicModule {
    return {
      module: PermissionModule,
      providers: [
        {
          provide: 'MODULE_NAME',
          useValue: moduleName,
        },
        permissionProvider,
      ],
      exports: ['MODULE_NAME', 'PERMISSIONS'],
    };
  }
}
