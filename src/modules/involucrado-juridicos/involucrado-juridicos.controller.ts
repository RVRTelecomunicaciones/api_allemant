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
  ApiTags,
  ApiBearerAuth,
  ApiOperation,
  ApiOkResponse,
} from '@nestjs/swagger';
import { CreateInvolucradoJuridicoDto } from './dto/create-involucrado-juridico.dto';
import { UpdateInvolucradoJuridicoDto } from './dto/update-involucrado-juridico.dto';
import { InvolucradoJuridico } from './entities/involucrado-juridico.entity';
import { InvolucradoJuridicosService } from './involucrado-juridicos.service';

@ApiTags('INVOLUCRADO-JURIDICOS')
@ApiBearerAuth()
@ApiAuth()
@Controller('involucrado-juridicos/')
export class InvolucradoJuridicosController {
  constructor(private service: InvolucradoJuridicosService) {}

  @ApiOperation({
    summary: 'Consultar lista de Involucrado Juridicos',
    description: 'Consulta de Involucrado Juridicos',
    externalDocs: {
      url: 'xx/list?order=ASC&page=1&take=20',
    },
  })
  @ApiOkResponse({
    description: 'Lista de Involucrado Juridicos Paginada',
  })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async listar(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<InvolucradoJuridico>> {
    return this.service.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Crear Involucrado Juridicos',
    description: 'Creación de Involucrado Juridicos',
  })
  @ApiOkResponse({
    type: String,
    description: 'Involucrado Juridicos creado correctamente',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createInvolucradoJuridico(
    @Body() createDto: CreateInvolucradoJuridicoDto,
  ): Promise<string> {
    return await this.service.createInvolucradoJuridico(createDto);
  }

  @ApiOperation({
    summary: 'Modificar Involucrado Juridico',
    description: 'Modificar la Involucrado Juridico correspondiente',
  })
  @ApiOkResponse({
    type: String,
    description: 'Involucrado Juridico modificada correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyInvolucradoJuridicoById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDto: UpdateInvolucradoJuridicoDto,
  ): Promise<string> {
    return await this.service.updateInvolucradoJuridicoById(id, updateDto);
  }

  @ApiOperation({
    summary: 'Eliminar Involucrado Juridico',
    description: 'Eliminar Involucrado Juridico basado en la identificación',
  })
  @ApiOkResponse({
    type: String,
    description: 'Involucrado Juridico eliminado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyInvolucradoJuridicoById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.service.deleteInvolucradoJuridico(id);
  }
}
