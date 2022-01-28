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
import { CreateServicioDto } from './dto/create-servicio.dto';
import { UpdateServicioDto } from './dto/update-servicio.dto';
import { Servicio } from './entities/servicio.entity';
import { ServiciosService } from './servicios.service';

@ApiTags('SERVICIOS')
@ApiBearerAuth()
@ApiAuth()
@Controller('servicios/')
export class ServiciosController {
  constructor(private servicioService: ServiciosService) {}

  @ApiOperation({
    summary: 'Consultar lista de Servicios',
    description: 'Consulta de Servicios',
    externalDocs: {
      url: 'xx/list?order=ASC&page=1&take=20',
    },
  })
  @ApiOkResponse({
    description: 'Lista de Servicios Paginada',
  })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async listar(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Servicio>> {
    return this.servicioService.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Crear Servicio',
    description: 'Creación de Servicio',
  })
  @ApiOkResponse({
    type: String,
    description: 'Servicio creado correctamente',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createServicio(
    @Body() createServicioDto: CreateServicioDto,
  ): Promise<string> {
    return await this.servicioService.createServicio(createServicioDto);
  }

  @ApiOperation({
    summary: 'Modificar Servicio',
    description: 'Modificar la Servicio correspondiente',
  })
  @ApiOkResponse({
    type: String,
    description: 'Servicio modificada correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyAreaById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateServicioDto: UpdateServicioDto,
  ): Promise<string> {
    return await this.servicioService.updateServicioById(id, updateServicioDto);
  }

  @ApiOperation({
    summary: 'Eliminar Servicio',
    description: 'Eliminar Servicio basado en la identificación',
  })
  @ApiOkResponse({
    type: String,
    description: 'Servicio eliminado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyServicioById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.servicioService.deleteServicio(id);
  }
}
