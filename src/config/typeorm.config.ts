import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { ConfigService } from '@nestjs/config';

export const typeOrmConfig = (
  configService: ConfigService,
): TypeOrmModuleOptions => ({
  type: configService.get<any>('DATABASE_DIALECT'),
  host: configService.get<string>('DATABASE_HOST'),
  port: configService.get<number>('DATABASE_PORT'),
  username: configService.get<string>('DATABASE_USER'),
  password: configService.get<string>('DATABASE_PASSWORD'),
  database: configService.get<string>('DATABASE_NAME'),
  entities: [
    __dirname + '/../**/*.entity.{js,ts}',
    __dirname + '/../**/entities/*.entity.{js,ts}',
  ],
  synchronize: true,
  migrationsRun: true,
  logging: ['query'],
  logger: 'file',
  dropSchema: false,
  migrations: [__dirname + 'migration/**/*{.ts,.js}'],
});
