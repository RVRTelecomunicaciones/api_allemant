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
import { CreateTipoCotizacionDto } from './dto/create-tipo-cotizacion.dto';
import { UpdateTipoCotizacionDto } from './dto/update-tipo-cotizacion.dto';
import { TipoCotizacion } from './entities/tipo-cotizacion.entity';
import { TipoCotizacionesService } from './tipo-cotizaciones.service';

@ApiTags('TIPO-COTIZACIONES')
@ApiBearerAuth()
@ApiAuth()
@Controller('tipo-cotizaciones/')
export class TipoCotizacionesController {
  constructor(private tipoCotizacionService: TipoCotizacionesService) {}

  @ApiOperation({
    summary: 'Consultar Tipo de Cotizción',
    description: 'Consulta de Tipo de Cotizaciones',
    externalDocs: {
      url: 'xx/list?order=ASC&page=1&take=20',
    },
  })
  @ApiOkResponse({
    description: 'Lista de Tipo de Cotización paginada',
  })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async listar(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<TipoCotizacion>> {
    return this.tipoCotizacionService.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Crear Tipo de Cotización',
    description: 'Creación de Tipo de Cotizaciones',
  })
  @ApiOkResponse({
    type: String,
    description: 'Tipo de cotización creado correctamente',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTipoCotizacion(
    @Body() createTipoCotizacionDto: CreateTipoCotizacionDto,
  ): Promise<string> {
    return await this.tipoCotizacionService.createTipoCotizacion(
      createTipoCotizacionDto,
    );
  }

  @ApiOperation({
    summary: 'Modificar Tipo de Cotización',
    description: 'Modificar el Tipo de Cotización',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyTipoCotizacionById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateTipoCotizacion: UpdateTipoCotizacionDto,
  ): Promise<string> {
    return await this.tipoCotizacionService.updateTipoCotizacionById(
      id,
      updateTipoCotizacion,
    );
  }

  @ApiOperation({
    summary: 'Eliminar Tipo de Cotización',
    description: 'Eliminar Tipo de Cotización',
  })
  @ApiOkResponse({
    type: String,
    description: 'Tipo de Cotización eliminado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyTipoCotizacionById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.tipoCotizacionService.deleteTipoCotizacion(id);
  }
}
