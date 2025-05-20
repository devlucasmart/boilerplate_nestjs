import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Product } from '../entities/product.entity';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/modules/logger/logger/logger.service';
import { plainToInstance } from 'class-transformer';
import { ProductResponseDto } from '../dto/product-response.dto';

@Injectable()
export class ProductService {
  constructor(
    @InjectRepository(Product)
    private repo: Repository<Product>,
    private loggerService: LoggerService,
  ) {}

  public async create(
    createProductDto: CreateProductDto,
  ): Promise<ProductResponseDto> {
    try {
      const product = this.repo.create(createProductDto);

      const savedProduct = await this.repo.save(product);

      this.loggerService.log(
        `ProductService - create - Produto criado com sucesso. ID: ${savedProduct.id}`,
      );

      return plainToInstance(ProductResponseDto, savedProduct);
    } catch (error) {
      this.loggerService.error(
        `ProductService - create - Erro ao criar produto: ${error.message}`,
        error.stack,
      );

      throw new InternalServerErrorException(
        'Erro ao tentar criar o produto. Por favor, tente novamente mais tarde.',
      );
    }
  }

  public async findAll(): Promise<ProductResponseDto[]> {
    try {
      const products = await this.repo.find({
        relations: ['enterprise'],
      });

      this.loggerService.log(
        `ProductService - findAll - Produtos encontrados: ${products.length}`,
      );

      return plainToInstance(ProductResponseDto, products);
    } catch (error) {
      this.loggerService.error(
        `ProductService - findAll - Erro ao buscar produtos: ${error.message}`,
        error.stack,
      );

      throw new InternalServerErrorException(
        'Erro ao tentar buscar os produtos. Por favor, tente novamente mais tarde.',
      );
    }
  }

  private async findById(id: string): Promise<Product> {
    try {
      const product = await this.repo.findOne({
        where: { id },
        relations: ['enterprise'],
      });

      if (!product) {
        this.loggerService.warn(
          `ProductService - findById - Produto não encontrado com ID: ${id}`,
        );
        throw new NotFoundException(`Produto com ID ${id} não encontrado.`);
      }

      this.loggerService.log(
        `ProductService - findById - Produto encontrado com ID: ${id}`,
      );

      return product;
    } catch (error) {
      this.loggerService.error(
        `ProductService - findById - Erro ao buscar produto com ID ${id}: ${error.message}`,
        error.stack,
      );

      throw new InternalServerErrorException(
        'Erro ao tentar buscar o produto. Por favor, tente novamente mais tarde.',
      );
    }
  }

  public async findOne(id: string): Promise<ProductResponseDto> {
    const product = await this.findById(id);
    return plainToInstance(ProductResponseDto, product);
  }

  public async update(
    id: string,
    updateProductDto: UpdateProductDto,
  ): Promise<ProductResponseDto> {
    const product = await this.findById(id);
    const updatedProduct = {
      ...product,
      ...updateProductDto,
    };

    await this.repo.save(updatedProduct);

    this.loggerService.log(
      `ProductService - update - Produto atualizado com ID: ${id}`,
    );

    return plainToInstance(ProductResponseDto, updatedProduct);
  }

  public async remove(id: string): Promise<void> {
    const product = await this.findById(id);
    await this.repo.remove(product);

    this.loggerService.log(
      `ProductService - remove - Produto removido com ID: ${id}`,
    );
  }
}
