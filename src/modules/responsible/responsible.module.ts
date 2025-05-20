import { Module } from '@nestjs/common';
import { ResponsibleService } from './services/responsible.service';
import { ResponsibleController } from './controllers/responsible.controller';

@Module({
  controllers: [ResponsibleController],
  providers: [ResponsibleService],
})
export class ResponsibleModule {}
