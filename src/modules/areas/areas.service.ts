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
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Area } from './entities/area.entity';

@Injectable()
export class AreasService {
  constructor(
    @InjectRepository(Area)
    private repository: Repository<Area>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Area>> {
    const queryBuilder = this.repository.createQueryBuilder('area');
    queryBuilder
      .orderBy({ 'area.created_at': pageOptionsDto.order })
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createArea(createDto: CreateAreaDto): Promise<string> {
    const { nombre } = createDto;
    const findNameResult: Pick<Area, 'id'> | undefined =
      await this.repository.findOne({
        where: { nombre },
        select: ['id'],
      });
    if (findNameResult) {
      throw new HttpException(
        `${nombre} el Área actual ya existe y no se puede crear repetidamente`,
        HttpStatus.OK,
      );
    }

    const area: Area = this.repository.create(createDto);
    await this.repository.save(area);
    return 'Área creada con éxito';
  }

  async updateAreaById(id: number, updateDto: UpdateAreaDto): Promise<string> {
    const existArea = await this.repository.findOne(id);
    console.log('Update Area');
    console.log(existArea);
    if (!existArea) {
      throw new NotFoundException(`Área con id ${id} no existe`);
    }
    const updateResponse = await this.repository.update(id, updateDto);
    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Error de modificación';
    }
  }

  async deleteArea(id: number): Promise<string> {
    const existArea = await this.repository.findOne(id);
    if (!existArea) {
      throw new HttpException(`Área con id ${id} no existe`, HttpStatus.OK);
    }

    const deleteResponse = await this.repository.softDelete(id);

    if (deleteResponse.affected) {
      return 'Eliminado con éxito';
    } else {
      return 'Se elimino correctamente';
    }
  }
}
