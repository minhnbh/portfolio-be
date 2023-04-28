const OrmConfig = {
  type: 'postgres',
  host: '127.0.0.1',
  port: 5432,
  username: 'postgres',
  password: 'P@ssw0rd',
  database: 'portfolio',
  entities: [
    __dirname + '/../**/*.entity.{js,ts}',
    __dirname + '/../**/entities/*.entity.{js,ts}',
  ],
  synchronize: false, //don't mark true, unless temporary
  logging: true,
  logger: 'file',
  dropSchema: false,
  migrations: ['src/migrations/*.ts'],
  //migrations: [__dirname + '/migrations/**/*{.ts,.js}'],
  cli: {
    migrationsDir: 'src/migrations',
  },
};

export = OrmConfig;
