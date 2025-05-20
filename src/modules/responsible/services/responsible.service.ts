import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateResponsibleDto } from '../dto/create-responsible.dto';
import { UpdateResponsibleDto } from '../dto/update-responsible.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Responsible } from '../entities/responsible.entity';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/modules/logger/logger/logger.service';
import { plainToInstance } from 'class-transformer';
import { ResponsibleResponseDto } from '../dto/responsible-response.dto';

@Injectable()
export class ResponsibleService {
  constructor(
    @InjectRepository(Responsible)
    private repo: Repository<Responsible>,
    private loggerService: LoggerService,
  ) {}

  public async create(
    createResponsibleDto: CreateResponsibleDto,
  ): Promise<ResponsibleResponseDto> {
    try {
      const responsible = this.repo.create(createResponsibleDto);

      const savedResponsible = await this.repo.save(responsible);

      this.loggerService.log(
        `ResponsibleService - create - Responsável criado com sucesso. ID: ${savedResponsible.id}`,
      );

      return plainToInstance(ResponsibleResponseDto, savedResponsible);
    } catch (error) {
      this.loggerService.error(
        `ResponsibleService - create - Erro ao criar responsável: ${error.message}`,
        error.stack,
      );

      throw new InternalServerErrorException(
        'Erro ao tentar criar o responsável. Por favor, tente novamente mais tarde.',
      );
    }
  }

  public async findAll(): Promise<ResponsibleResponseDto[]> {
    try {
      const responsibles = await this.repo.find({
        relations: ['enterprise'],
      });

      this.loggerService.log(
        `ResponsibleService - findAll - Responsáveis encontrados: ${responsibles.length}`,
      );

      return plainToInstance(ResponsibleResponseDto, responsibles);
    } catch (error) {
      this.loggerService.error(
        `ResponsibleService - findAll - Erro ao buscar responsáveis: ${error.message}`,
        error.stack,
      );

      throw new InternalServerErrorException(
        'Erro ao tentar buscar os responsáveis. Por favor, tente novamente mais tarde.',
      );
    }
  }

  private async findById(id: string): Promise<Responsible> {
    try {
      const responsible = await this.repo.findOne({
        where: { id },
        relations: ['enterprise'],
      });

      if (!responsible) {
        this.loggerService.warn(
          `ResponsibleService - findById - Responsável não encontrado com ID: ${id}`,
        );
        throw new NotFoundException(`Responsável com ID ${id} não encontrado.`);
      }

      this.loggerService.log(
        `ResponsibleService - findById - Responsável encontrado com ID: ${id}`,
      );

      return responsible;
    } catch (error) {
      this.loggerService.error(
        `ResponsibleService - findById - Erro ao buscar responsável com ID ${id}: ${error.message}`,
        error.stack,
      );

      throw new InternalServerErrorException(
        'Erro ao tentar buscar o responsável. Por favor, tente novamente mais tarde.',
      );
    }
  }

  public async findOne(id: string): Promise<ResponsibleResponseDto> {
    const responsible = await this.findById(id);
    return plainToInstance(ResponsibleResponseDto, responsible);
  }

  public async update(
    id: string,
    updateResponsibleDto: UpdateResponsibleDto,
  ): Promise<ResponsibleResponseDto> {
    const responsible = await this.findById(id);
    const updatedResponsible = {
      ...responsible,
      ...updateResponsibleDto,
    };

    await this.repo.save(updatedResponsible);

    this.loggerService.log(
      `ResponsibleService - update - Responsável atualizado com ID: ${id}`,
    );

    return plainToInstance(ResponsibleResponseDto, updatedResponsible);
  }

  public async remove(id: string): Promise<void> {
    const responsible = await this.findById(id);
    await this.repo.remove(responsible);

    this.loggerService.log(
      `ResponsibleService - remove - Responsável removido com ID: ${id}`,
    );
  }
}
