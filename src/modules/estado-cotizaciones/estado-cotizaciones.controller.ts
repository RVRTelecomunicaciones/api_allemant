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
  Query,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { UpdateEstadoCotizacionDto } from './dto/update-estado-cotizacion.dto';
import { EstadoCotizacion } from './entities/estado-cotizacion.entity';
import { EstadoCotizacionesService } from './estado-cotizaciones.service';

@ApiTags('ESTADO-COTIZACION')
@ApiBearerAuth()
@ApiAuth()
@Controller('estado-cotizaciones/')
export class EstadoCotizacionesController {
  constructor(private estadoCotizacionService: EstadoCotizacionesService) {}

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
    return this.estadoCotizacionService.findAll(pageOptionsDto);
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
    @Body() updateEstadoCotizacionDto: UpdateEstadoCotizacionDto,
  ): Promise<string> {
    return await this.estadoCotizacionService.updateEstadoCotizacionById(
      id,
      updateEstadoCotizacionDto,
    );
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
    return await this.estadoCotizacionService.deleteEstadoCotizacion(id);
  }
}
