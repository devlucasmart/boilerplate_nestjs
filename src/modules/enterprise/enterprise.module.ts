import { Module } from '@nestjs/common';
import { EnterpriseService } from './services/enterprise.service';
import { EnterpriseController } from './controllers/enterprise.controller';

@Module({
  controllers: [EnterpriseController],
  providers: [EnterpriseService],
})
export class EnterpriseModule {}
