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
  constructor(private requisitoService: RequisitosService) {}

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
    return this.requisitoService.findAll(pageOptionsDto);
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
  async createArea(
    @Body() createRequisitoDto: CreateRequisitoDto,
  ): Promise<string> {
    return await this.requisitoService.createRequisito(createRequisitoDto);
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
  async modifyAreaById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateRequisitoDto: UpdateRequisitoDto,
  ): Promise<string> {
    return await this.requisitoService.updateRequisitoById(
      id,
      updateRequisitoDto,
    );
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
  async destroyMonedaById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.requisitoService.deleteRequisito(id);
  }
}
