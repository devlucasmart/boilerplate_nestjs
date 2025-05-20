import {
  Controller,
  Get,
  Post,
  Put,
  Delete,
  Param,
  Body,
  HttpCode,
  HttpStatus,
} from '@nestjs/common';
import { EnterpriseService } from '../services/enterprise.service';
import { CreateEnterpriseDto } from '../dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from '../dto/update-enterprise.dto';
import { EnterpriseResponseDto } from '../dto/enterprise-response.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Enterprises')
@Controller('enterprises')
export class EnterpriseController {
  constructor(private readonly enterpriseService: EnterpriseService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Empresa criada com sucesso.',
    type: EnterpriseResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos.',
  })
  async create(
    @Body() createEnterpriseDto: CreateEnterpriseDto,
  ): Promise<EnterpriseResponseDto> {
    return this.enterpriseService.create(createEnterpriseDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de empresas retornada com sucesso.',
    type: [EnterpriseResponseDto],
  })
  async findAll(): Promise<EnterpriseResponseDto[]> {
    return this.enterpriseService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Empresa retornada com sucesso.',
    type: EnterpriseResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Empresa não encontrada.',
  })
  async findOne(@Param('id') id: string): Promise<EnterpriseResponseDto> {
    return this.enterpriseService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Empresa atualizada com sucesso.',
    type: EnterpriseResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Empresa não encontrada.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateEnterpriseDto: UpdateEnterpriseDto,
  ): Promise<EnterpriseResponseDto> {
    return this.enterpriseService.update(id, updateEnterpriseDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Empresa removida com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Empresa não encontrada.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.enterpriseService.remove(id);
  }
}
