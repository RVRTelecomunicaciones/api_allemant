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
import { CreateTipoServicioDto } from './dto/create-tipo-servicio.dto';
import { UpdateTipoServicioDto } from './dto/update-tipo-servicio.dto';
import { TipoServicio } from './entities/tipo-servicio.entity';

@Injectable()
export class TipoServiciosService {
  constructor(
    @InjectRepository(TipoServicio)
    private tipoServicioRepository: Repository<TipoServicio>,
  ) {}

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<TipoServicio>> {
    const queryBuilder =
      this.tipoServicioRepository.createQueryBuilder('tipoServicio');
    queryBuilder
      .orderBy('tipoServicio.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createTipoServicio(
    createTipoServicioDto: CreateTipoServicioDto,
  ): Promise<string> {
    const { nombre } = createTipoServicioDto;
    const findNameResult: Pick<TipoServicio, 'id'> | undefined =
      await this.tipoServicioRepository.findOne({
        where: { nombre },
        select: ['id'],
      });
    if (findNameResult) {
      throw new HttpException(
        `${nombre} el Tipo de Servicio actual ya existe y no se puede crear repetidamente`,
        HttpStatus.OK,
      );
    }

    const tiposervicio: TipoServicio = this.tipoServicioRepository.create(
      createTipoServicioDto,
    );
    await this.tipoServicioRepository.save(tiposervicio);
    return 'Tipo de Servicio creado con éxito';
  }

  async updateTipoServicioById(
    id: number,
    updateTipoServicioDto: UpdateTipoServicioDto,
  ): Promise<string> {
    const existTipoServicio = await this.tipoServicioRepository.findOne(id);
    console.log('Update Tipo de Servicio');
    console.log(existTipoServicio);
    if (!existTipoServicio) {
      throw new NotFoundException(`Tipo de Servicio id ${id} no existe`);
    }
    const updateResponse = await this.tipoServicioRepository.update(
      id,
      updateTipoServicioDto,
    );

    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Error de modificación';
    }
  }

  async deleteTipoServicio(id: number): Promise<string> {
    const existTipoServicio = await this.tipoServicioRepository.findOne(id);
    if (!existTipoServicio) {
      throw new HttpException(
        `Tipo de Servicio con id ${id} no existe`,
        HttpStatus.OK,
      );
    }
    const deleteResponse = await this.tipoServicioRepository.softDelete(id);
    if (deleteResponse.affected) {
      return 'Eliminado con éxito';
    } else {
      return 'No se pudo eliminar';
    }
  }
}
