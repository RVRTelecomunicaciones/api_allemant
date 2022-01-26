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
import { CreateEstadoCoordinacionDto } from './dto/create-estado-coordinacion.dto';
import { UpdateEstadoCoordinacionDto } from './dto/update-estado-coordinacion.dto';
import { EstadoCoordinacion } from './entities/estado-coordinacion.entity';
import { EstadoCoordinacionesService } from './estado-coordinaciones.service';

@ApiTags('ESTADO-COORDINACIONES')
@ApiBearerAuth()
@ApiAuth()
@Controller('estado-coordinaciones/')
export class EstadoCoordinacionesController {
  constructor(private estadoCoordinacionService: EstadoCoordinacionesService) {}

  @ApiOperation({
    summary: 'Consultar lista de Estados de Coordinación',
    description: 'Consulta de Estados de Coordinación',
    externalDocs: {
      url: 'xx/list?order=ASC&page=1&take=20',
    },
  })
  @ApiOkResponse({
    description: 'Lista de Estados de Coordinación Paginada',
  })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async listar(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<EstadoCoordinacion>> {
    return this.estadoCoordinacionService.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Crear Estados de Coordinación',
    description: 'Creación de Estados de Coordinación de la Empresa',
  })
  @ApiOkResponse({
    type: String,
    description: 'Estados de Coordinación creado correctamente',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createArea(
    @Body() createEstadoCoordinacionDto: CreateEstadoCoordinacionDto,
  ): Promise<string> {
    return await this.estadoCoordinacionService.createEstadoCoordinacion(
      createEstadoCoordinacionDto,
    );
  }

  @ApiOperation({
    summary: 'Modificar Estados de Coordinación',
    description: 'Modificar el Estados de Coordinación correspondiente',
  })
  @ApiOkResponse({
    type: String,
    description: 'Estados de Coordinación modificado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyAreaById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateEstadoCoordinacionDto: UpdateEstadoCoordinacionDto,
  ): Promise<string> {
    return await this.estadoCoordinacionService.updateEstadoCoordinacionById(
      id,
      updateEstadoCoordinacionDto,
    );
  }

  @ApiOperation({
    summary: 'Eliminar Estado de Coordinación',
    description:
      'Eliminar Estado de Coordinación basado en la identificación del Area',
  })
  @ApiOkResponse({
    type: String,
    description: 'Estado de Coordinación eliminado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyAreaById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.estadoCoordinacionService.deleteEstadoCoordinacion(id);
  }
}
