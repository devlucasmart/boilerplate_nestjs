import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { ApiProperty } from '@nestjs/swagger';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Notebook Gamer',
    required: false,
  })
  name?: string;

  @ApiProperty({
    description: 'Descrição detalhada do produto',
    example: 'Notebook com processador Intel i7, 16GB RAM, SSD 512GB',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Preço do produto',
    example: 4999.99,
    required: false,
  })
  price?: number;

  @ApiProperty({
    description: 'Quantidade em estoque',
    example: 10,
    required: false,
  })
  stock?: number;

  @ApiProperty({
    description: 'Categoria do produto',
    example: 'Eletrônicos',
    required: false,
  })
  category?: string;
}
