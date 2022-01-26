import { PageMetaDto } from '@app/dto/page-meta.dto';
import { PageOptionsDto } from '@app/dto/page-metaoption.dto';
import { PageDto } from '@app/dto/page.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateMonedaDto } from './dto/create-moneda.dto';
import { UpdateMonedaDto } from './dto/update-moneda.dto';
import { Moneda } from './entities/moneda.entity';

@Injectable()
export class MonedasService {
  constructor(
    @InjectRepository(Moneda)
    private monedaRepository: Repository<Moneda>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Moneda>> {
    const queryBuilder = this.monedaRepository.createQueryBuilder('co_moneda');
    queryBuilder
      .orderBy('co_moneda.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createMoneda(createMonedaDto: CreateMonedaDto): Promise<string> {
    const { nombre } = createMonedaDto;
    const findNameResult: Pick<Moneda, 'id'> | undefined =
      await this.monedaRepository.findOne({
        where: { nombre },
        select: ['id'],
      });
    if (findNameResult) {
      throw new HttpException(
        `${nombre} la Moneda actual ya existe y no se puede crear repetidamente`,
        HttpStatus.OK,
      );
    }

    const moneda: Moneda = this.monedaRepository.create(createMonedaDto);
    await this.monedaRepository.save(moneda);
    return 'Moneda creada con exito';
  }

  async updateMonedaById(
    id: number,
    updateMonedaDto: UpdateMonedaDto,
  ): Promise<string> {
    const existMoneda = await this.monedaRepository.findOne(id);
    console.log('Update Moneda');
    console.log(existMoneda);
    if (!existMoneda) {
      throw new NotFoundException(`Moneda con id ${id} no existe`);
    }
    const updateResponse = await this.monedaRepository.update(
      id,
      updateMonedaDto,
    );

    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Error de modificación';
    }
  }

  async deleteMoneda(id: number): Promise<string> {
    const existMoneda = await this.monedaRepository.findOne(id);
    if (!existMoneda) {
      throw new HttpException(`Moneda con id ${id} no existe`, HttpStatus.OK);
    }

    const deleteResponse = await this.monedaRepository.softDelete(id);

    if (deleteResponse.affected) {
      return 'Eliminado con éxito';
    } else {
      return 'No se pudo eliminar';
    }
  }
}
