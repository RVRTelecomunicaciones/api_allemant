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
import { UpdateTipoServicioDto } from '../tipo-servicios/dto/update-tipo-servicio.dto';
import { CreateTipoCotizacionDto } from './dto/create-tipo-cotizacion.dto';
import { TipoCotizacion } from './entities/tipo-cotizacion.entity';

@Injectable()
export class TipoCotizacionesService {
  constructor(
    @InjectRepository(TipoCotizacion)
    private tipoCotizacionRepository: Repository<TipoCotizacion>,
  ) {}

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<TipoCotizacion>> {
    const queryBuilder =
      this.tipoCotizacionRepository.createQueryBuilder('co_cotizacion_tipo');
    queryBuilder
      .orderBy('co_cotizacion_tipo.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createTipoCotizacion(
    createTipocotizacionDto: CreateTipoCotizacionDto,
  ): Promise<string> {
    const { nombre } = createTipocotizacionDto;
    const findNameResult: Pick<TipoCotizacion, 'id'> | undefined =
      await this.tipoCotizacionRepository.findOne({
        where: { nombre },
        select: ['id'],
      });

    if (findNameResult) {
      throw new HttpException(
        `${nombre} el Tipo de Cotización actual ya existe y no se puede crear repetidamente`,
        HttpStatus.OK,
      );
    }

    const tipoCotizacion: TipoCotizacion = this.tipoCotizacionRepository.create(
      createTipocotizacionDto,
    );
    await this.tipoCotizacionRepository.save(tipoCotizacion);
    return 'Tipo de Cotización creado con éxito';
  }

  async updateTipoCotizacionById(
    id: number,
    updateTipoCotizacionDto: UpdateTipoServicioDto,
  ): Promise<string> {
    const existTipoCotizacion = await this.tipoCotizacionRepository.findOne(id);
    console.log('Update Tipo de Cotización');
    console.log(existTipoCotizacion);
    if (!existTipoCotizacion) {
      throw new NotFoundException(`Tipo de Cotización con id ${id} no existe`);
    }
    const updateResponse = await this.tipoCotizacionRepository.update(
      id,
      updateTipoCotizacionDto,
    );

    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Error de modificación';
    }
  }

  async deleteTipoCotizacion(id: number): Promise<string> {
    const existTipoCotizacion = await this.tipoCotizacionRepository.findOne(id);
    if (!existTipoCotizacion) {
      throw new HttpException(
        `Tipo de Cotización con id ${id} no existe`,
        HttpStatus.OK,
      );
    }
    const deleteResponse = await this.tipoCotizacionRepository.softDelete(id);

    if (deleteResponse.affected) {
      return 'Eliminado con éxito';
    } else {
      return 'No se pudo eliminar';
    }
  }
}
