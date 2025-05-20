import { ApiProperty } from '@nestjs/swagger';

export class ResponsibleResponseDto {
  @ApiProperty({
    description: 'Nome do responsável',
    example: 'João Silva',
  })
  name: string;

  @ApiProperty({
    description: 'E-mail do responsável',
    example: 'joao.silva@email.com',
  })
  email: string;

  @ApiProperty({
    description: 'Telefone do responsável',
    example: '(11) 91234-5678',
  })
  phone: string;

  @ApiProperty({
    description: 'ID da empresa associada ao responsável',
    example: 1,
  })
  enterpriseId: string;
}
