import { Module } from '@nestjs/common';
import { ConfigModule, ConfigType } from '@nestjs/config';
import { typeormConfig } from './common/config/typeorm.config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EnterpriseModule } from './modules/enterprise/enterprise.module';
import { ResponsibleModule } from './modules/responsible/responsible.module';
import { ProductsModule } from './modules/products/products.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeormConfig],
    }),
    TypeOrmModule.forRootAsync({
      inject: [typeormConfig.KEY],
      useFactory: async (config: ConfigType<typeof typeormConfig>) => config,
    }),
    EnterpriseModule,
    ResponsibleModule,
    ProductsModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
