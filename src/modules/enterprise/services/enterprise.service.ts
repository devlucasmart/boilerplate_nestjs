import {
  Injectable,
  InternalServerErrorException,
  NotFoundException,
} from '@nestjs/common';
import { CreateEnterpriseDto } from '../dto/create-enterprise.dto';
import { UpdateEnterpriseDto } from '../dto/update-enterprise.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Enterprise } from '../entities/enterprise.entity';
import { Repository } from 'typeorm';
import { LoggerService } from 'src/modules/logger/logger/logger.service';
import { EnterpriseResponseDto } from '../dto/enterprise-response.dto';
import { plainToInstance } from 'class-transformer';

@Injectable()
export class EnterpriseService {
  constructor(
    @InjectRepository(Enterprise)
    private repo: Repository<Enterprise>,
    private loggerService: LoggerService,
  ) {}

  public async create(
    createEnterpriseDto: CreateEnterpriseDto,
  ): Promise<EnterpriseResponseDto> {
    try {
      const enterprise = this.repo.create(createEnterpriseDto);

      const savedEnterprise = await this.repo.save(enterprise);

      this.loggerService.log(
        `EnterpriseService - create - Empresa criada com sucesso. ID: ${savedEnterprise.id}`,
      );

      return plainToInstance(EnterpriseResponseDto, savedEnterprise);
    } catch (error) {
      this.loggerService.error(
        `EnterpriseService - create - Erro ao criar empresa: ${error.message}`,
        error.stack,
      );

      throw new InternalServerErrorException(
        'Erro ao tentar criar a empresa. Por favor, tente novamente mais tarde.',
      );
    }
  }

  public async findAll(): Promise<EnterpriseResponseDto[]> {
    try {
      const enterprise = await this.repo.find({
        relations: ['responsible'],
      });

      this.loggerService.log(
        `EnterpriseService - findAll - empresas encontradas`,
      );

      return plainToInstance(EnterpriseResponseDto, enterprise);
    } catch (error) {
      this.loggerService.error(
        `EnterpriseService - findAll - Erro ao buscar empresas: ${error.message}`,
        error.stack,
      );

      throw new InternalServerErrorException(
        'Erro ao tentar buscar as empresas. Por favor, tente novamente mais tarde.',
      );
    }
  }

  private async findById(id: string): Promise<Enterprise> {
    try {
      const enterprise = await this.repo.findOneBy({ id });

      if (!enterprise) {
        this.loggerService.warn(
          `EnterpriseService - findById - Empresa não encontrada com ID: ${id}`,
        );
        throw new NotFoundException(`Empresa com ID ${id} não encontrada.`);
      }

      this.loggerService.log(
        `EnterpriseService - findById - Empresa encontrada com ID: ${id}`,
      );

      return enterprise;
    } catch (error) {
      this.loggerService.error(
        `EnterpriseService - findById - Erro ao buscar empresa com ID ${id}: ${error.message}`,
        error.stack,
      );

      throw new InternalServerErrorException(
        'Erro ao tentar buscar a empresa. Por favor, tente novamente mais tarde.',
      );
    }
  }

  public async findOne(id: string): Promise<EnterpriseResponseDto> {
    const enterprise = await this.findById(id);
    return plainToInstance(EnterpriseResponseDto, enterprise);
  }

  public async update(
    id: string,
    updateEnterpriseDto: UpdateEnterpriseDto,
  ): Promise<EnterpriseResponseDto> {
    const enterprise = await this.findById(id);
    const newEnterprise = {
      ...enterprise,
      ...updateEnterpriseDto,
    };

    this.repo.save(newEnterprise);

    this.loggerService.log(
      `UserService - update - usuario atualizado com id: ${JSON.stringify(id)}`,
    );

    return plainToInstance(EnterpriseResponseDto, newEnterprise);
  }

  public async remove(id: string): Promise<void> {
    const enterprise = await this.findById(id);
    await this.repo.remove(enterprise);
  }
}
