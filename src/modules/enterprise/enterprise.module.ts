import { Module } from '@nestjs/common';
import { EnterpriseService } from './services/enterprise.service';
import { EnterpriseController } from './controllers/enterprise.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Enterprise } from './entities/enterprise.entity';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Enterprise]), LoggerModule],
  controllers: [EnterpriseController],
  providers: [EnterpriseService],
})
export class EnterpriseModule {}
