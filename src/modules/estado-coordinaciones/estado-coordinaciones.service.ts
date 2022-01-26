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
import { CreateEstadoCoordinacionDto } from './dto/create-estado-coordinacion.dto';
import { UpdateEstadoCoordinacionDto } from './dto/update-estado-coordinacion.dto';
import { EstadoCoordinacion } from './entities/estado-coordinacion.entity';

@Injectable()
export class EstadoCoordinacionesService {
  constructor(
    @InjectRepository(EstadoCoordinacion)
    private estadoCoodinacionRepository: Repository<EstadoCoordinacion>,
  ) {}

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<EstadoCoordinacion>> {
    const queryBuilder = this.estadoCoodinacionRepository.createQueryBuilder(
      'coor_coordinacion_estado',
    );
    queryBuilder
      .orderBy('coor_coordinacion_estado.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createEstadoCoordinacion(
    createEstadoCOordinacionDto: CreateEstadoCoordinacionDto,
  ): Promise<string> {
    const { nombre } = createEstadoCOordinacionDto;
    const findNameResult: Pick<EstadoCoordinacion, 'id'> | undefined =
      await this.estadoCoodinacionRepository.findOne({
        where: { nombre },
        select: ['id'],
      });
    if (findNameResult) {
      throw new HttpException(
        `${nombre} el Estado de Coordinación actual ya existe`,
        HttpStatus.OK,
      );
    }

    const estadoCoordinacion: EstadoCoordinacion =
      this.estadoCoodinacionRepository.create(createEstadoCOordinacionDto);
    await this.estadoCoodinacionRepository.save(estadoCoordinacion);
    return 'Estado de Coordión creado con éxito';
  }

  async updateEstadoCoordinacionById(
    id: number,
    updateEstadoCoordinacionDto: UpdateEstadoCoordinacionDto,
  ): Promise<string> {
    const existEstadoCoordinacion =
      await this.estadoCoodinacionRepository.findOne(id);
    console.log('Update Estado de Coordinación');
    console.log(existEstadoCoordinacion);
    if (!existEstadoCoordinacion) {
      throw new NotFoundException(`Estado de Coordinación id ${id} no existe`);
    }
    const updateResponse = await this.estadoCoodinacionRepository.update(
      id,
      updateEstadoCoordinacionDto,
    );

    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Error de modificación';
    }
  }

  async deleteEstadoCoordinacion(id: number): Promise<string> {
    const existEstadoCoordinacion =
      await this.estadoCoodinacionRepository.findOne(id);
    if (!existEstadoCoordinacion) {
      throw new HttpException(
        `Estado de Coordinación con id ${id} no existe`,
        HttpStatus.OK,
      );
    }

    const deleteResponse = await this.estadoCoodinacionRepository.softDelete(
      id,
    );

    if (deleteResponse.affected) {
      return 'Eliminado con éxito';
    } else {
      return 'No se pudo eliminar';
    }
  }
}
