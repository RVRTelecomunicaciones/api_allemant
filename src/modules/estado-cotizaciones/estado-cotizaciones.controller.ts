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
import { CreateEstadoCotizacionDto } from './dto/create-estado-cotizacion.dto';
import { UpdateEstadoCotizacionDto } from './dto/update-estado-cotizacion.dto';
import { EstadoCotizacion } from './entities/estado-cotizacion.entity';
import { EstadoCotizacionesService } from './estado-cotizaciones.service';

@ApiTags('ESTADO-COTIZACIONES')
@ApiBearerAuth()
@ApiAuth()
@Controller('estado-cotizaciones/')
export class EstadoCotizacionesController {
  constructor(private service: EstadoCotizacionesService) {}

  @ApiOperation({
    summary: 'Consultar lista de Estados de Cotización',
    description: 'Consultar Estados de Cotización',
    externalDocs: {
      url: 'xx/list?order=ASC&page=1&take=20',
    },
  })
  @ApiOkResponse({
    description: 'Lista de Estados de Cotización Paginada',
  })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async listar(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<EstadoCotizacion>> {
    return this.service.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Crear Estados de Cotización',
    description: 'Creación de Estados de Cotización de la Empresa',
  })
  @ApiOkResponse({
    type: String,
    description: 'Estados de Cotización creado correctamente',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createArea(
    @Body() createDto: CreateEstadoCotizacionDto,
  ): Promise<string> {
    return await this.service.createEstadoCotizacion(createDto);
  }

  @ApiOperation({
    summary: 'Modificar Estado de Cotización',
    description: 'Modificar el Estado de cotización',
  })
  @ApiOkResponse({
    type: String,
    description: 'Estado de Cotización modificado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyEstadoCotizacionById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDto: UpdateEstadoCotizacionDto,
  ): Promise<string> {
    return await this.service.updateEstadoCotizacionById(id, updateDto);
  }

  @ApiOperation({
    summary: 'Eliminar Estado de Cotización',
    description: 'Eliminar Estado de Cotización',
  })
  @ApiOkResponse({
    type: String,
    description: 'Estado de Cotización eliminado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyEstadoCotizacionById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.service.deleteEstadoCotizacion(id);
  }
}
