import { PageMetaDto } from '@app/dto/page-meta.dto';
import { PageOptionsDto } from '@app/dto/page-metaoption.dto';
import { PageDto } from '@app/dto/page.dto';
import {
  HttpException,
  HttpStatus,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { PartialType } from '@nestjs/swagger';
import { InjectRepository } from '@nestjs/typeorm';
import { json } from 'stream/consumers';
import { EntityManager, getManager, Repository } from 'typeorm';
import { Requisito } from '../requisitos/entities/requisito.entity';
import { CreateServicioDto } from './dto/create-servicio.dto';
import { ServicioRequisitoReqDto } from './dto/serviciorequisito.req.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Servicio } from './entities/servicio.entity';

@Injectable()
export class ServiciosService {
  constructor(
    @InjectRepository(Servicio)
    private repository: Repository<Servicio>,
    @InjectRepository(Requisito)
    private repositoryRequisito: Repository<Requisito>,
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

  async createServicioRequisito(
    servicioRequisito: CreateServicioDto,
  ): Promise<any> {
    const servicio = await this.repository.create(servicioRequisito);
    console.log(servicio);

    /*  const servicio2: Servicio = { ...servicio, requisitos: servicioRequisito.requisito[] };
    await this.repository.save(servicio2);
    console.log('A:' + JSON.stringify(servicio));
    const requisitos = await this.repositoryRequisito.findByIds(
      servicio.requisitos,
      { relations: ['requisitos'] },
    );
    console.log('b:' + JSON.stringify(requisitos));

    for (const requisito of requisitos) {
      requisito.servicios.push(servicio);
    }
    return this.repositoryRequisito.save(requisitos); */

    /* return getManager()
      .transaction(async (entityManager: EntityManager) => {
        const { servicio, requisitoId } = servicioRequisito;
        await entityManager.delete<Servicio>(Servicio, servicio);

        const newRequisit: any = requisitoId.map((item: any) => {
          return {
            servicio,
            requisitoID: item,
          };
        });

        console.log(newRequisit);

        const result = entityManager.create<Servicio>(Servicio, newRequisit);
        await entityManager.save<Servicio>(result);
      })
      .then(() => {
        return '分配菜单权限成功';
      })
      .catch((e: HttpException) => {
        throw new HttpException(e, HttpStatus.OK);
      }); */
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
