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
import { CreateInvolucradoJuridicoDto } from './dto/create-involucrado-juridico.dto';
import { UpdateInvolucradoJuridicoDto } from './dto/update-involucrado-juridico.dto';
import { InvolucradoJuridico } from './entities/involucrado-juridico.entity';

@Injectable()
export class InvolucradoJuridicosService {
  constructor(
    @InjectRepository(InvolucradoJuridico)
    private repository: Repository<InvolucradoJuridico>,
  ) {}

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<InvolucradoJuridico>> {
    const queryBuilder = this.repository.createQueryBuilder(
      'co_involucrado_juridico',
    );
    queryBuilder
      .leftJoinAndSelect(
        'co_involucrado_juridico.tipoDocumento',
        'involucrados',
      )
      .leftJoinAndSelect('co_involucrado_juridico.sector', 'involucradosSec')
      .leftJoinAndSelect(
        'co_involucrado_juridico.clasificacion',
        'involucradosClas',
      )
      .orderBy('co_involucrado_juridico.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createInvolucradoJuridico(
    createDto: CreateInvolucradoJuridicoDto,
  ): Promise<string> {
    const { nro_documento } = createDto;
    const findNameResult: Pick<InvolucradoJuridico, 'id'> | undefined =
      await this.repository.findOne({
        where: { nro_documento },
        select: ['id'],
      });
    if (findNameResult) {
      throw new HttpException(
        `${nro_documento} El Involucrado actual ya existe y no se puede crear repetidamente`,
        HttpStatus.OK,
      );
    }

    const involucradoJuridico: InvolucradoJuridico =
      this.repository.create(createDto);
    await this.repository.save(involucradoJuridico);
    return 'Involucrado Juridico creado con exito';
  }

  async updateInvolucradoJuridicoById(
    id: number,
    updateDto: UpdateInvolucradoJuridicoDto,
  ): Promise<any> {
    const existInvolucradoJuridico = await this.repository.findOne(id);

    if (!existInvolucradoJuridico) {
      throw new NotFoundException(`Involucrado con id ${id} no existe`);
    }

    const {
      razon_social,
      tipoDocumento,
      nro_documento,
      telefono,
      direccion,
      sector,
      clasificacion,
    } = updateDto;

    const Myobjeto: Partial<InvolucradoJuridico> = {
      razon_social: razon_social,
      tipoDocumento: tipoDocumento,
      nro_documento: nro_documento,
      telefono: telefono,
      direccion: direccion,
      sector: sector,
      clasificacion: clasificacion,
    };
    console.log(Myobjeto);

    const updateResponse = await this.repository.update(
      existInvolucradoJuridico.id,
      Myobjeto,
    );
    console.log(updateResponse);

    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Errors de modificación';
    }
  }

  async deleteInvolucradoJuridico(id: number): Promise<string> {
    const existInvolucradoJuridico = await this.repository.findOne(id);
    if (!existInvolucradoJuridico) {
      throw new HttpException(
        `Involucrado con id ${id} no existe`,
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
