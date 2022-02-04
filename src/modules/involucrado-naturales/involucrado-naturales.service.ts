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
import { CreateInvolucradoNaturalDto } from './dto/create-involucrado-natural.dto';
import { UpdateInvolucradoNaturalDto } from './dto/update-involucrado-natural.dto';
import { InvolucradoNatural } from './entities/involucrado-natural.entity';

@Injectable()
export class InvolucradoNaturalesService {
  constructor(
    @InjectRepository(InvolucradoNatural)
    private repository: Repository<InvolucradoNatural>,
  ) {}

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<InvolucradoNatural>> {
    const queryBuilder = this.repository.createQueryBuilder(
      'co_involucrado_natural',
    );
    queryBuilder
      .leftJoinAndSelect('co_involucrado_natural.tipoDocumento', 'involucrados')
      .orderBy('co_involucrado_natural.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createInvolucradoNatural(
    createDto: CreateInvolucradoNaturalDto,
  ): Promise<string> {
    const { nro_documento } = createDto;
    const findNameResult: Pick<InvolucradoNatural, 'id'> | undefined =
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

    const involucradoNatural: InvolucradoNatural =
      this.repository.create(createDto);
    await this.repository.save(involucradoNatural);
    return 'Involucrado Natural creado con exito';
  }

  async updateInvolucradoNaturalById(
    id: number,
    updateDto: UpdateInvolucradoNaturalDto,
  ): Promise<any> {
    const existInvolucradoNatural = await this.repository.findOne(id);

    if (!existInvolucradoNatural) {
      throw new NotFoundException(`Involucrado con id ${id} no existe`);
    }

    const {
      paterno,
      materno,
      nombre,
      tipoDocumento,
      nro_documento,
      telefono,
      celular1,
      celular2,
      direccion,
      correo,
    } = updateDto;

    const Myobjeto: Partial<InvolucradoNatural> = {
      paterno: paterno,
      materno: materno,
      nombre: nombre,
      tipoDocumento: tipoDocumento,
      nro_documento: nro_documento,
      telefono: telefono,
      celular1: celular1,
      celular2: celular2,
      direccion: direccion,
      correo: correo,
    };
    console.log(Myobjeto);

    const updateResponse = await this.repository.update(
      existInvolucradoNatural.id,
      Myobjeto,
    );
    console.log(updateResponse);

    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Errors de modificación';
    }
  }

  async deleteInvolucradoNatural(id: number): Promise<string> {
    const existInvolucradoNatural = await this.repository.findOne(id);
    if (!existInvolucradoNatural) {
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
