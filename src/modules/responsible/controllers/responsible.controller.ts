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
import { ResponsibleService } from '../services/responsible.service';
import { CreateResponsibleDto } from '../dto/create-responsible.dto';
import { UpdateResponsibleDto } from '../dto/update-responsible.dto';
import { ResponsibleResponseDto } from '../dto/responsible-response.dto';
import { ApiTags, ApiResponse } from '@nestjs/swagger';

@ApiTags('Responsibles')
@Controller('responsibles')
export class ResponsibleController {
  constructor(private readonly responsibleService: ResponsibleService) {}

  @Post()
  @HttpCode(HttpStatus.CREATED)
  @ApiResponse({
    status: HttpStatus.CREATED,
    description: 'Responsável criado com sucesso.',
    type: ResponsibleResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.BAD_REQUEST,
    description: 'Dados inválidos.',
  })
  async create(
    @Body() createResponsibleDto: CreateResponsibleDto,
  ): Promise<ResponsibleResponseDto> {
    return this.responsibleService.create(createResponsibleDto);
  }

  @Get()
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Lista de responsáveis retornada com sucesso.',
    type: [ResponsibleResponseDto],
  })
  async findAll(): Promise<ResponsibleResponseDto[]> {
    return this.responsibleService.findAll();
  }

  @Get(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Responsável retornado com sucesso.',
    type: ResponsibleResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Responsável não encontrado.',
  })
  async findOne(@Param('id') id: string): Promise<ResponsibleResponseDto> {
    return this.responsibleService.findOne(id);
  }

  @Put(':id')
  @HttpCode(HttpStatus.OK)
  @ApiResponse({
    status: HttpStatus.OK,
    description: 'Responsável atualizado com sucesso.',
    type: ResponsibleResponseDto,
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Responsável não encontrado.',
  })
  async update(
    @Param('id') id: string,
    @Body() updateResponsibleDto: UpdateResponsibleDto,
  ): Promise<ResponsibleResponseDto> {
    return this.responsibleService.update(id, updateResponsibleDto);
  }

  @Delete(':id')
  @HttpCode(HttpStatus.NO_CONTENT)
  @ApiResponse({
    status: HttpStatus.NO_CONTENT,
    description: 'Responsável removido com sucesso.',
  })
  @ApiResponse({
    status: HttpStatus.NOT_FOUND,
    description: 'Responsável não encontrado.',
  })
  async remove(@Param('id') id: string): Promise<void> {
    return this.responsibleService.remove(id);
  }
}
