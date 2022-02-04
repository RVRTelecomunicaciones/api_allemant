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
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo-documento.dto';
import { TipoDocumento } from './entities/tipo-documento.entity';

@Injectable()
export class TipoDocumentosService {
  constructor(
    @InjectRepository(TipoDocumento)
    private repository: Repository<TipoDocumento>,
  ) {}

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<TipoDocumento>> {
    const queryBuilder =
      this.repository.createQueryBuilder('co_documento_tipo');

    queryBuilder
      .orderBy('co_documento_tipo.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createTipoDocumento(
    createDto: CreateTipoDocumentoDto,
  ): Promise<string> {
    const { nombre } = createDto;
    const findNameResult: Pick<TipoDocumento, 'id'> | undefined =
      await this.repository.findOne({
        where: { nombre },
        select: ['id'],
      });
    if (findNameResult) {
      throw new HttpException(
        `${nombre} el Tipo de Documento actual ya existe y no se puede crear repetidamente`,
        HttpStatus.OK,
      );
    }

    const tipoDocumento: TipoDocumento = this.repository.create(createDto);
    await this.repository.save(tipoDocumento);
    return 'Tipo de Documento creado con éxito';
  }

  async updateTipoDocumentoById(
    id: number,
    updateDto: UpdateTipoDocumentoDto,
  ): Promise<string> {
    const existTipoDocumento = await this.repository.findOne(id);
    console.log('Update Tipo de Documento');
    console.log(existTipoDocumento);
    if (!existTipoDocumento) {
      throw new NotFoundException(`Tipo de Documento id ${id} no existe`);
    }
    const updateResponse = await this.repository.update(id, updateDto);

    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Error de modificación';
    }
  }

  async deleteTipoDocumento(id: number): Promise<string> {
    const existTipoDocumento = await this.repository.findOne(id);
    if (!existTipoDocumento) {
      throw new HttpException(
        `Tipo de Documento con id ${id} no existe`,
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
