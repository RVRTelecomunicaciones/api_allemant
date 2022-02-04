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
    private repository: Repository<Moneda>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Moneda>> {
    const queryBuilder = this.repository.createQueryBuilder('co_moneda');
    queryBuilder
      .orderBy('co_moneda.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createMoneda(createDto: CreateMonedaDto): Promise<string> {
    const { nombre } = createDto;
    const findNameResult: Pick<Moneda, 'id'> | undefined =
      await this.repository.findOne({
        where: { nombre },
        select: ['id'],
      });
    if (findNameResult) {
      throw new HttpException(
        `${nombre} la Moneda actual ya existe y no se puede crear repetidamente`,
        HttpStatus.OK,
      );
    }

    const moneda: Moneda = this.repository.create(createDto);
    await this.repository.save(moneda);
    return 'Moneda creada con exito';
  }

  async updateMonedaById(
    id: number,
    updateDto: UpdateMonedaDto,
  ): Promise<string> {
    const existMoneda = await this.repository.findOne(id);
    console.log('Update Moneda');
    console.log(existMoneda);
    if (!existMoneda) {
      throw new NotFoundException(`Moneda con id ${id} no existe`);
    }
    const updateResponse = await this.repository.update(id, updateDto);

    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Error de modificación';
    }
  }

  async deleteMoneda(id: number): Promise<string> {
    const existMoneda = await this.repository.findOne(id);
    if (!existMoneda) {
      throw new HttpException(`Moneda con id ${id} no existe`, HttpStatus.OK);
    }

    const deleteResponse = await this.repository.softDelete(id);

    if (deleteResponse.affected) {
      return 'Eliminado con éxito';
    } else {
      return 'No se pudo eliminar';
    }
  }
}
