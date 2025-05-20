import { Module } from '@nestjs/common';
import { ResponsibleService } from './services/responsible.service';
import { ResponsibleController } from './controllers/responsible.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Responsible } from './entities/responsible.entity';
import { LoggerModule } from '../logger/logger.module';
@Module({
  imports: [TypeOrmModule.forFeature([Responsible]), LoggerModule],
  controllers: [ResponsibleController],
  providers: [ResponsibleService],
})
export class ResponsibleModule {}
