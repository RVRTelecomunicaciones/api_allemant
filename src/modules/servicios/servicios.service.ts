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
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Servicio } from './entities/servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private servicioRepository: Repository<Servicio>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Servicio>> {
    const queryBuilder =
      this.servicioRepository.createQueryBuilder('co_servicio');
    queryBuilder
      .leftJoinAndSelect('co_servicio.tipoServicioId', 'id')
      .orderBy('co_servicio.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createServicio(createServicioDto: CreateServicioDto): Promise<string> {
    const { nombre } = createServicioDto;
    const findNameResult: Pick<Servicio, 'id'> | undefined =
      await this.servicioRepository.findOne({
        where: { nombre },
        select: ['id'],
      });
    if (findNameResult) {
      throw new HttpException(
        `${nombre} El Servicio actual ya existe y no se puede crear repetidamente`,
        HttpStatus.OK,
      );
    }

    const servicio: Servicio =
      this.servicioRepository.create(createServicioDto);
    await this.servicioRepository.save(servicio);
    return 'Servicio creado con exito';
  }

  async updateServicioById(
    id: number,
    updateServicioDto: UpdateServicioDto,
  ): Promise<string> {
    const servicio = await this.servicioRepository.preload({
      id: id,
      ...updateServicioDto,
    });

    if (!servicio) {
      throw new NotFoundException(`Servicio con id ${id} no existe`);
    }

    await this.servicioRepository.save(servicio);
    return 'Servicio modificado con exito';
  }

  /*async updateServicioById(
    id: number,
    updateServicioDto: UpdateServicioDto,
  ): Promise<string> {
    const existServicio = await this.servicioRepository.findOne(id);
    console.log('Update Servicio');
    console.log(existServicio);
    if (!existServicio) {
      throw new NotFoundException(`Servicio con id ${id} no existe`);
    }
    const updateResponse = await this.servicioRepository.update(
      id,
      updateServicioDto,
    );

    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Error de modificación';
    }
  }*/

  async deleteServicio(id: number): Promise<string> {
    const existServicio = await this.servicioRepository.findOne(id);
    if (!existServicio) {
      throw new HttpException(`Servicio con id ${id} no existe`, HttpStatus.OK);
    }

    const deleteResponse = await this.servicioRepository.softDelete(id);

    if (deleteResponse.affected) {
      return 'Eliminado con éxito';
    } else {
      return 'No se pudo eliminar';
    }
  }
}
