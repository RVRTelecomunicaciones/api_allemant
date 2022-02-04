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
import { CreateTipoServicioDto } from './dto/create-tipo-servicio.dto';
import { UpdateTipoServicioDto } from './dto/update-tipo-servicio.dto';
import { TipoServicio } from './entities/tipo-servicio.entity';
import { TipoServiciosService } from './tipo-servicios.service';

@ApiTags('TIPO-SERVICIOS')
@ApiBearerAuth()
@ApiAuth()
@Controller('tipo-servicios/')
export class TipoServiciosController {
  constructor(private service: TipoServiciosService) {}

  @ApiOperation({
    summary: 'Consultar lista de Tipo de Servicios',
    description: 'Consulta de Tipo de Servicios',
    externalDocs: {
      url: 'xx/list?order=ASC&page=1&take=20',
    },
  })
  @ApiOkResponse({
    description: 'Lista de Tipo de Servicios paginada',
  })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async listar(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<TipoServicio>> {
    return this.service.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Crear Tipo de Servicios',
    description: 'Creación de Tipo de Servicios',
  })
  @ApiOkResponse({
    type: String,
    description: 'Tipo de Servicios creado correctamente',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createTipoServicio(
    @Body() createDto: CreateTipoServicioDto,
  ): Promise<string> {
    return await this.service.createTipoServicio(createDto);
  }

  @ApiOperation({
    summary: 'Modificar Tipo de Servicio',
    description: 'Modificar el Tipo de Servicio correspondiente',
  })
  @ApiOkResponse({
    type: String,
    description: 'Tipo de Servicio modificado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyTipoServicioById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDto: UpdateTipoServicioDto,
  ): Promise<string> {
    return await this.service.updateTipoServicioById(id, updateDto);
  }

  @ApiOperation({
    summary: 'Eliminar Tipo de Servicios',
    description: 'Eliminar Tipo de Servicio',
  })
  @ApiOkResponse({
    type: String,
    description: 'Tipo de Servicio eliminado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyTipoServicioById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.service.deleteTipoServicio(id);
  }
}
