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
import { CreateTipoDocumentoDto } from './dto/create-tipo-documento.dto';
import { UpdateTipoDocumentoDto } from './dto/update-tipo-documento.dto';
import { TipoDocumento } from './entities/tipo-documento.entity';
import { TipoDocumentosService } from './tipo-documentos.service';

@ApiTags('TIPO-DOCUMENTOS')
@ApiBearerAuth()
@ApiAuth()
@Controller('tipo-documentos/')
export class TipoDocumentosController {
  constructor(private service: TipoDocumentosService) {}

  @ApiOperation({
    summary: 'Consultar lista de Tipo de Documentos',
    description: 'Consulta de Tipo de Documentos',
    externalDocs: {
      url: 'xx/list?order=ASC&page=1&take=20',
    },
  })
  @ApiOkResponse({
    description: 'Lista de Tipo de Documentos paginada',
  })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async listar(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<TipoDocumento>> {
    return this.service.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Crear Tipo de Documentos',
    description: 'Creación de Tipo de Documentos',
  })
  @ApiOkResponse({
    type: String,
    description: 'Tipo de Documentos creado correctamente',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createRole(@Body() createDto: CreateTipoDocumentoDto): Promise<string> {
    return await this.service.createTipoDocumento(createDto);
  }

  @ApiOperation({
    summary: 'Modificar Tipo de Documento',
    description: 'Modificar el Tipo de Documento correspondiente',
  })
  @ApiOkResponse({
    type: String,
    description: 'Tipo de Documento modificado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyTipoDocumentoById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDto: UpdateTipoDocumentoDto,
  ): Promise<string> {
    return await this.service.updateTipoDocumentoById(id, updateDto);
  }

  @ApiOperation({
    summary: 'Eliminar Tipo de Documento',
    description: 'Eliminar Tipo de Documento',
  })
  @ApiOkResponse({
    type: String,
    description: 'Tipo de Documento eliminado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyTipoDocumentoById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.service.deleteTipoDocumento(id);
  }
}
