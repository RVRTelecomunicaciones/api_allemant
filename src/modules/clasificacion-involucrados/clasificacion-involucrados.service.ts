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
import { CreateClasificacionInvolucradoDto } from './dto/create-clasificacion-involucrado.dto';
import { UpdateClasificacionInvolucradoDto } from './dto/update-clasificacion-involucrado.dto';
import { ClasificacionInvolucrado } from './entities/clasificacion-involucrado.entity';

@Injectable()
export class ClasificacionInvolucradosService {
  constructor(
    @InjectRepository(ClasificacionInvolucrado)
    private repository: Repository<ClasificacionInvolucrado>,
  ) {}

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ClasificacionInvolucrado>> {
    const queryBuilder = this.repository.createQueryBuilder(
      'co_involucrado_clasificacion',
    );
    queryBuilder
      .orderBy('co_involucrado_clasificacion.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createClasificacionInvolucrado(
    createDto: CreateClasificacionInvolucradoDto,
  ): Promise<string> {
    const { nombre } = createDto;
    const findNameResult: Pick<ClasificacionInvolucrado, 'id'> | undefined =
      await this.repository.findOne({
        where: { nombre },
        select: ['id'],
      });
    if (findNameResult) {
      throw new HttpException(
        `${nombre} la Clasificación actual ya existe y no se puede crear repetidamente`,
        HttpStatus.OK,
      );
    }

    const clasificacionInvolucrado: ClasificacionInvolucrado =
      this.repository.create(createDto);
    await this.repository.save(clasificacionInvolucrado);
    return 'Clasificación creado con éxito';
  }

  async updateClasificacionInvolucradoById(
    id: number,
    updateClasificacionInvolucradoDto: UpdateClasificacionInvolucradoDto,
  ): Promise<string> {
    const existClasificacionInvolucrado = await this.repository.findOne(id);
    console.log('Update Clasificación');
    console.log(existClasificacionInvolucrado);
    if (!existClasificacionInvolucrado) {
      throw new NotFoundException(`Clasificación id ${id} no existe`);
    }
    const updateResponse = await this.repository.update(
      id,
      updateClasificacionInvolucradoDto,
    );

    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Error de modificación';
    }
  }

  async deleteClasificacionInvolucrado(id: number): Promise<string> {
    const existClasificacionInvolucrado = await this.repository.findOne(id);
    if (!existClasificacionInvolucrado) {
      throw new HttpException(
        `Clasificación con id ${id} no existe`,
        HttpStatus.OK,
      );
    }
    const deleteResponse = await this.repository.softDelete(id);
    if (deleteResponse.affected) {
      return 'Eliminado con éxito';
    } else {
      return 'No se pudo eliminar';
    }
  }
}
