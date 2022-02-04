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
import { TipoServicio } from '../tipo-servicios/entities/tipo-servicio.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Servicio } from './entities/servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private repository: Repository<Servicio>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Servicio>> {
    const queryBuilder = this.repository.createQueryBuilder('co_servicio');
    queryBuilder
      .leftJoinAndSelect('co_servicio.tipoServicio', 'servicios')
      .orderBy('co_servicio.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createServicio(createDto: CreateServicioDto): Promise<string> {
    const { nombre } = createDto;
    const findNameResult: Pick<Servicio, 'id'> | undefined =
      await this.repository.findOne({
        where: { nombre },
        select: ['id'],
      });
    if (findNameResult) {
      throw new HttpException(
        `${nombre} El Servicio actual ya existe y no se puede crear repetidamente`,
        HttpStatus.OK,
      );
    }

    const servicio: Servicio = this.repository.create(createDto);
    await this.repository.save(servicio);
    return 'Servicio creado con exito';
  }

  async updateServicioById(
    id: number,
    updateDto: UpdateServicioDto,
  ): Promise<any> {
    const existServicio = await this.repository.findOne(id);

    if (!existServicio) {
      throw new NotFoundException(`Servicio con id ${id} no existe`);
    }

    const { nombre, tipoServicio } = updateDto;

    const Myobjeto: Partial<Servicio> = {
      nombre: nombre,
      tipoServicio: tipoServicio,
    };
    console.log(Myobjeto);

    const updateResponse = await this.repository.update(
      existServicio.id,
      Myobjeto,
    );
    console.log(updateResponse);

    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Errors de modificación';
    }
  }

  async deleteServicio(id: number): Promise<string> {
    const existServicio = await this.repository.findOne(id);
    if (!existServicio) {
      throw new HttpException(`Servicio con id ${id} no existe`, HttpStatus.OK);
    }

    const deleteResponse = await this.repository.softDelete(id);

    if (deleteResponse.affected) {
      return 'Eliminado con éxito';
    } else {
      return 'No se pudo eliminar';
    }
  }
}
