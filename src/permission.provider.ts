const permissions = {
  app: ['Read', 'Write', 'Delete'],
  blogs: ['Read', 'Write'],
};

export const permissionProvider = {
  provide: 'PERMISSIONS',
  useFactory: (moduleName: string) => {
    console.log('permissionProvider');
    console.log(moduleName);
    return permissions[moduleName] || [];
  },
  inject: [{ token: 'MODULE_NAME', optional: false }],
};
