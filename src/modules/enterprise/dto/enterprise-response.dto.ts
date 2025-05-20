import { ApiProperty } from '@nestjs/swagger';

export class EnterpriseResponseDto {
  @ApiProperty({
    description: 'Nome da empresa',
    example: 'Tech Solutions Ltda',
  })
  name: string;

  @ApiProperty({
    description: 'Telefone da empresa',
    example: '(11) 98765-4321',
  })
  phone: string;

  @ApiProperty({
    description: 'E-mail da empresa',
    example: 'contato@techsolutions.com',
  })
  email: string;

  @ApiProperty({
    description: 'CNPJ da empresa',
    example: '76.237.646/0001-59',
  })
  cnpj: string;
}
