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
import { CreateInvolucradoNaturalDto } from './dto/create-involucrado-natural.dto';
import { UpdateInvolucradoNaturalDto } from './dto/update-involucrado-natural.dto';
import { InvolucradoNatural } from './entities/involucrado-natural.entity';
import { InvolucradoNaturalesService } from './involucrado-naturales.service';

@ApiTags('INVOLUCRADO-NATURALES')
@ApiBearerAuth()
@ApiAuth()
@Controller('involucrado-naturales/')
export class InvolucradoNaturalesController {
  constructor(private service: InvolucradoNaturalesService) {}

  @ApiOperation({
    summary: 'Consultar lista de Involucrado Naturales',
    description: 'Consulta de Involucrado Naturales',
    externalDocs: {
      url: 'xx/list?order=ASC&page=1&take=20',
    },
  })
  @ApiOkResponse({
    description: 'Lista de Involucrado Naturales Paginada',
  })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async listar(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<InvolucradoNatural>> {
    return this.service.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Crear Involucrado Naturales',
    description: 'Creación de Involucrado Naturales',
  })
  @ApiOkResponse({
    type: String,
    description: 'Involucrado creado correctamente',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createInvolucradoNatural(
    @Body() createDto: CreateInvolucradoNaturalDto,
  ): Promise<string> {
    return await this.service.createInvolucradoNatural(createDto);
  }

  @ApiOperation({
    summary: 'Modificar Involucrado Natural',
    description: 'Modificar la Involucrado Natural correspondiente',
  })
  @ApiOkResponse({
    type: String,
    description: 'Involucrado modificada correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyInvolucradoNaturalById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDto: UpdateInvolucradoNaturalDto,
  ): Promise<string> {
    return await this.service.updateInvolucradoNaturalById(id, updateDto);
  }

  @ApiOperation({
    summary: 'Eliminar Involucrado Natural',
    description: 'Eliminar Involucrado Natural basado en la identificación',
  })
  @ApiOkResponse({
    type: String,
    description: 'Involucrado eliminado correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyInvolucradoNaturalById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.service.deleteInvolucradoNatural(id);
  }
}
