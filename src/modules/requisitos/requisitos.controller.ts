import { ApiAuth } from '@app/decorators/api.auth';
import { PageOptionsDto } from '@app/dto/page-metaoption.dto';
import { PageDto } from '@app/dto/page.dto';
import {
  Body,
  Controller,
  Delete,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  ParseIntPipe,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { CreateRequisitoDto } from './dto/create-requisito.dto';
import { UpdateRequisitoDto } from './dto/update-requisito';
import { Requisito } from './entities/requisito.entity';
import { RequisitosService } from './requisitos.service';

@ApiTags('REQUISITOS')
@ApiBearerAuth()
@ApiAuth()
@Controller('requisitos/')
export class RequisitosController {
  constructor(private service: RequisitosService) {}

  @ApiOperation({
    summary: 'Consultar lista de Requistos',
    description: 'Consulta de Requistos',
    externalDocs: {
      url: 'xx/list?order=ASC&page=1&take=20',
    },
  })
  @ApiOkResponse({
    description: 'Lista de Requistos Paginada',
  })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async listar(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Requisito>> {
    return this.service.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Crear Requisito',
    description: 'Creación de Requisitos',
  })
  @ApiOkResponse({
    type: String,
    description: 'Requisito creado correctamente',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createRequisito(
    @Body() createDto: CreateRequisitoDto,
  ): Promise<string> {
    return await this.service.createRequisito(createDto);
  }

  @ApiOperation({
    summary: 'Modificar Requisito',
    description: 'Modificar el Requisito correspondiente',
  })
  @ApiOkResponse({
    type: String,
    description: 'Requisito modificado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyRequisitoById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDto: UpdateRequisitoDto,
  ): Promise<string> {
    return await this.service.updateRequisitoById(id, updateDto);
  }

  @ApiOperation({
    summary: 'Eliminar Requisito',
    description: 'Eliminar Requisito basado en la identificación',
  })
  @ApiOkResponse({
    type: String,
    description: 'Requisito eliminado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyRequisitoById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.service.deleteRequisito(id);
  }
}
