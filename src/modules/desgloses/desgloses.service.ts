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
import { CreateDesgloseDto } from './dto/create-desglose.dto';
import { UpdateDesgloseDto } from './dto/update-desglose.dto';
import { Desglose } from './entities/desglose.entity';

@Injectable()
export class DesglosesService {
  constructor(
    @InjectRepository(Desglose)
    private desgloseRepository: Repository<Desglose>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Desglose>> {
    const queryBuilder =
      this.desgloseRepository.createQueryBuilder('co_desglose');
    queryBuilder
      .orderBy('co_desglose.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createDesglose(createDesgloseDto: CreateDesgloseDto): Promise<string> {
    const { nombre } = createDesgloseDto;
    const findNameResult: Pick<Desglose, 'id'> | undefined =
      await this.desgloseRepository.findOne({
        where: { nombre },
        select: ['id'],
      });
    if (findNameResult) {
      throw new HttpException(
        `${nombre} el Desglose actual ya existe y no se puede crear repetidamente`,
        HttpStatus.OK,
      );
    }

    const desglose: Desglose =
      this.desgloseRepository.create(createDesgloseDto);
    await this.desgloseRepository.save(desglose);
    return 'Desglose creada con éxito';
  }

  async updateDesgloseById(
    id: number,
    updateDesgloseDto: UpdateDesgloseDto,
  ): Promise<string> {
    const existDesglose = await this.desgloseRepository.findOne(id);
    console.log('Update desglose');
    console.log(existDesglose);
    if (!existDesglose) {
      throw new NotFoundException(`Desglose con id ${id} no existe`);
    }
    const updateResponse = await this.desgloseRepository.update(
      id,
      updateDesgloseDto,
    );

    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Error de modificación';
    }
  }

  async deleteDesglose(id: number): Promise<string> {
    const existDesglose = await this.desgloseRepository.findOne(id);
    if (!existDesglose) {
      throw new HttpException(`Desglose con id ${id} no existe`, HttpStatus.OK);
    }
    const deleteResponse = await this.desgloseRepository.softDelete(id);
    if (deleteResponse.affected) {
      return 'Eliminado con éxito';
    } else {
      return 'No se pudo eliminar';
    }
  }
}
