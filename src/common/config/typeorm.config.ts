import { registerAs } from '@nestjs/config';
import { TypeOrmModuleOptions } from '@nestjs/typeorm';

const TYPEORM_MODULE_CONFIG = 'typeorm';

export const typeormConfig = registerAs(
  TYPEORM_MODULE_CONFIG,
  (): TypeOrmModuleOptions => {
    return {
      type: 'mysql',
      url: process.env.DATABASE_URL
        ? process.env.URL
        : 'mysql://user:user123@localhost:5432/estudodb',
      migrationsRun:
        'string' === typeof process.env.DATABASE_MIGRATIONS_RUN
          ? process.env.DATABASE_MIGRATIONS_RUN === 'true'
          : false,
      entities: [__dirname + '/../**/*.entity.{js, ts}'],
      subscribers: [],
      synchronize: true,
      autoLoadEntities: true,
      logging: true,
      logger: 'file',
    };
  },
);
