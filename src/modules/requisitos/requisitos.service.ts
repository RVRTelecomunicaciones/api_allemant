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
import { CreateRequisitoDto } from './dto/create-requisito.dto';
import { UpdateRequisitoDto } from './dto/update-requisito';
import { Requisito } from './entities/requisito.entity';

@Injectable()
export class RequisitosService {
  constructor(
    @InjectRepository(Requisito)
    private requisitoRepository: Repository<Requisito>,
  ) {}

  async findAll(pageOptionsDto: PageOptionsDto): Promise<PageDto<Requisito>> {
    const queryBuilder =
      this.requisitoRepository.createQueryBuilder('co_requisito');
    queryBuilder
      .orderBy('co_requisito.createdAt', pageOptionsDto.order)
      .skip(pageOptionsDto.skip)
      .take(pageOptionsDto.take);

    const itemCount = await queryBuilder.getCount();
    const { entities } = await queryBuilder.getRawAndEntities();

    const pageMetaDto = new PageMetaDto({ itemCount, pageOptionsDto });

    return new PageDto(entities, pageMetaDto);
  }

  async createRequisito(
    createRequisitoDto: CreateRequisitoDto,
  ): Promise<string> {
    const { nombre } = createRequisitoDto;
    const findNameResult: Pick<Requisito, 'id'> | undefined =
      await this.requisitoRepository.findOne({
        where: { nombre },
        select: ['id'],
      });
    if (findNameResult) {
      throw new HttpException(
        `${nombre} El Requisito actual ya existe y no se puede crear repetidamente`,
        HttpStatus.OK,
      );
    }

    const requisito: Requisito =
      this.requisitoRepository.create(createRequisitoDto);
    await this.requisitoRepository.save(requisito);
    return 'Requisito creado con exito';
  }

  async updateRequisitoById(
    id: number,
    updateRequisitoDto: UpdateRequisitoDto,
  ): Promise<string> {
    const existRequisito = await this.requisitoRepository.findOne(id);
    console.log('Update Requisito');
    console.log(existRequisito);
    if (!existRequisito) {
      throw new NotFoundException(`Moneda con id ${id} no existe`);
    }
    const updateResponse = await this.requisitoRepository.update(
      id,
      updateRequisitoDto,
    );

    if (updateResponse.affected) {
      return 'Modificación exitosa';
    } else {
      return 'Error de modificación';
    }
  }

  async deleteRequisito(id: number): Promise<string> {
    const existRequisito = await this.requisitoRepository.findOne(id);
    if (!existRequisito) {
      throw new HttpException(
        `Requisito con id ${id} no existe`,
        HttpStatus.OK,
      );
    }

    const deleteResponse = await this.requisitoRepository.softDelete(id);

    if (deleteResponse.affected) {
      return 'Eliminado con éxito';
    } else {
      return 'No se pudo eliminar';
    }
  }
}
