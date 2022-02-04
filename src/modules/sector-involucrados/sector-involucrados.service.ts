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
import { CreateSectorInvolucradoDto } from './dto/create-sector-involucrado.dto';
import { UpdateSectorInvolucradoDto } from './dto/update-sector-involucrado.dto';
import { SectorInvolucrado } from './entities/sector-involucrado.entity';

@Injectable()
export class SectorInvolucradosService {
  constructor(
    @InjectRepository(SectorInvolucrado)
    private repository: Repository<SectorInvolucrado>,
  ) {}

  async findAll(
    pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<SectorInvolucrado>> {
    const queryBuilder = this.repository.createQueryBuilder(
      'co_involucrado_sector',
    );
    queryBuilder
      .orderBy('co_involucrado_sector.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createSectorInvolucrado(
    createDto: CreateSectorInvolucradoDto,
  ): Promise<string> {
    const { nombre } = createDto;
    const findNameResult: Pick<SectorInvolucrado, 'id'> | undefined =
      await this.repository.findOne({
        where: { nombre },
        select: ['id'],
      });
    if (findNameResult) {
      throw new HttpException(
        `${nombre} el Sector de Involucrados actual ya existe y no se puede crear repetidamente`,
        HttpStatus.OK,
      );
    }

    const sectorInvolucrado: SectorInvolucrado =
      this.repository.create(createDto);
    await this.repository.save(sectorInvolucrado);
    return 'Sector de Involucrados creado con éxito';
  }

  async updateSectorInvolucradoById(
    id: number,
    updateDto: UpdateSectorInvolucradoDto,
  ): Promise<string> {
    const existSectorInvolucrado = await this.repository.findOne(id);
    console.log('Update Sector de Involucrados');
    console.log(existSectorInvolucrado);
    if (!existSectorInvolucrado) {
      throw new NotFoundException(`Sector id ${id} no existe`);
    }
    const updateResponse = await this.repository.update(id, updateDto);

    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Error de modificación';
    }
  }

  async deleteSectorInvolucrado(id: number): Promise<string> {
    const existSectorInvolucrado = await this.repository.findOne(id);
    if (!existSectorInvolucrado) {
      throw new HttpException(`Sector con id ${id} no existe`, HttpStatus.OK);
    }
    const deleteResponse = await this.repository.softDelete(id);
    if (deleteResponse.affected) {
      return 'Eliminado con éxito';
    } else {
      return 'No se pudo eliminar';
    }
  }
}
