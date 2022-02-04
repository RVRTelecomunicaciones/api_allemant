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
import { ClasificacionInvolucradosService } from './clasificacion-involucrados.service';
import { CreateClasificacionInvolucradoDto } from './dto/create-clasificacion-involucrado.dto';
import { UpdateClasificacionInvolucradoDto } from './dto/update-clasificacion-involucrado.dto';
import { ClasificacionInvolucrado } from './entities/clasificacion-involucrado.entity';

@ApiTags('CLASIFICACIÓN-INVOLUCRADOS')
@ApiBearerAuth()
@ApiAuth()
@Controller('clasificacion-involucrados/')
export class ClasificacionInvolucradosController {
  constructor(private service: ClasificacionInvolucradosService) {}

  @ApiOperation({
    summary: 'Consultar lista de la Clasificación',
    description: 'Consulta de la Clasificación',
    externalDocs: {
      url: 'xx/list?order=ASC&page=1&take=20',
    },
  })
  @ApiOkResponse({
    description: 'Lista de la Clasificación paginada',
  })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async listar(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<ClasificacionInvolucrado>> {
    return this.service.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Crear Clasificación',
    description: 'Creación de la Clasificación',
  })
  @ApiOkResponse({
    type: String,
    description: 'Clasificación creada correctamente',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createClasificacionInvolucrado(
    @Body()
    createDto: CreateClasificacionInvolucradoDto,
  ): Promise<string> {
    return await this.service.createClasificacionInvolucrado(createDto);
  }

  @ApiOperation({
    summary: 'Modificar Clasificación',
    description: 'Modificar la Clasificación correspondiente',
  })
  @ApiOkResponse({
    type: String,
    description: 'Clasificación modificada correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyClasificacionInvolucradoById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body()
    updateDto: UpdateClasificacionInvolucradoDto,
  ): Promise<string> {
    return await this.service.updateClasificacionInvolucradoById(id, updateDto);
  }

  @ApiOperation({
    summary: 'Eliminar Clasificación',
    description: 'Eliminar Clasificación basado en la identificación',
  })
  @ApiOkResponse({
    type: String,
    description: 'Clasificación eliminada correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyClasificacionInvolucradoById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.service.deleteClasificacionInvolucrado(id);
  }
}
