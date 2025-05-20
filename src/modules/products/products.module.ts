import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductController } from './controllers/products.controller';
import { ProductService } from './services/products.service';
import { LoggerModule } from '../logger/logger.module';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), LoggerModule],
  controllers: [ProductController],
  providers: [ProductService],
})
export class ProductsModule {}
