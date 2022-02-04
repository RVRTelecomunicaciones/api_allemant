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
import { CreateSectorInvolucradoDto } from './dto/create-sector-involucrado.dto';
import { UpdateSectorInvolucradoDto } from './dto/update-sector-involucrado.dto';
import { SectorInvolucrado } from './entities/sector-involucrado.entity';
import { SectorInvolucradosService } from './sector-involucrados.service';

@ApiTags('SECTOR-INVOLUCRADOS')
@ApiBearerAuth()
@ApiAuth()
@Controller('sector-involucrados/')
export class SectorInvolucradosController {
  constructor(private sectorInvolucradoService: SectorInvolucradosService) {}

  @ApiOperation({
    summary: 'Consultar lista de Sectores de Involucrados',
    description: 'Consulta de Sectores de Involucrados',
    externalDocs: {
      url: 'xx/list?order=ASC&page=1&take=20',
    },
  })
  @ApiOkResponse({
    description: 'Lista de Sectores de Involucrados paginada',
  })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async listar(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<SectorInvolucrado>> {
    return this.sectorInvolucradoService.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Crear Sector de Involucrados',
    description: 'Creación de Sector de Involucrados',
  })
  @ApiOkResponse({
    type: String,
    description: 'Sector de Involucrados creado correctamente',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createRole(
    @Body() createSectorInvolucradoDto: CreateSectorInvolucradoDto,
  ): Promise<string> {
    return await this.sectorInvolucradoService.createSectorInvolucrado(
      createSectorInvolucradoDto,
    );
  }

  @ApiOperation({
    summary: 'Modificar Sector de Involucrados',
    description: 'Modificar el Sector de Involucrado correspondiente',
  })
  @ApiOkResponse({
    type: String,
    description: 'Sector de Involucrados modificado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyTipoServicioById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateSectorInvolucradoDto: UpdateSectorInvolucradoDto,
  ): Promise<string> {
    return await this.sectorInvolucradoService.updateSectorInvolucradoById(
      id,
      updateSectorInvolucradoDto,
    );
  }

  @ApiOperation({
    summary: 'Eliminar Sector de Involucrados',
    description: 'Eliminar Sector de Involucrados',
  })
  @ApiOkResponse({
    type: String,
    description: 'Sector de Involucrados eliminado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyTipoServicioById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.sectorInvolucradoService.deleteSectorInvolucrado(id);
  }
}
