import { ApiProperty } from '@nestjs/swagger';

export class ProductResponseDto {
  @ApiProperty({
    description: 'Nome do produto',
    example: 'Notebook Gamer',
  })
  name: string;

  @ApiProperty({
    description: 'Descrição detalhada do produto',
    example: 'Notebook com processador Intel i7, 16GB RAM, SSD 512GB',
    required: false,
  })
  description?: string;

  @ApiProperty({
    description: 'Preço do produto',
    example: 4999.99,
  })
  price: number;

  @ApiProperty({
    description: 'Quantidade em estoque',
    example: 10,
  })
  stock: number;

  @ApiProperty({
    description: 'Categoria do produto',
    example: 'Eletrônicos',
    required: false,
  })
  category?: string;

  @ApiProperty({
    description: 'ID da empresa associada ao produto',
    example: 1,
  })
  enterpriseId: string;
}
