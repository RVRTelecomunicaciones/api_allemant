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
import { CreateMonedaDto } from './dto/create-moneda.dto';
import { UpdateMonedaDto } from './dto/update-moneda.dto';
import { Moneda } from './entities/moneda.entity';
import { MonedasService } from './monedas.service';

@ApiTags('MONEDAS')
@ApiBearerAuth()
@ApiAuth()
@Controller('monedas/')
export class MonedasController {
  constructor(private monedaService: MonedasService) {}

  @ApiOperation({
    summary: 'Consultar lista de Monedas',
    description: 'Consulta de Monedas',
    externalDocs: {
      url: 'xx/list?order=ASC&page=1&take=20',
    },
  })
  @ApiOkResponse({
    description: 'Lista de Monedas Paginada',
  })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async listar(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Moneda>> {
    return this.monedaService.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Crear Moneda',
    description: 'Creación de Moneda',
  })
  @ApiOkResponse({
    type: String,
    description: 'Moneda creada correctamente',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createArea(@Body() createMonedaDto: CreateMonedaDto): Promise<string> {
    return await this.monedaService.createMoneda(createMonedaDto);
  }

  @ApiOperation({
    summary: 'Modificar Moneda',
    description: 'Modificar la Moneda correspondiente',
  })
  @ApiOkResponse({
    type: String,
    description: 'Moneda modificada correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyAreaById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateMonedaDto: UpdateMonedaDto,
  ): Promise<string> {
    return await this.monedaService.updateMonedaById(id, updateMonedaDto);
  }

  @ApiOperation({
    summary: 'Eliminar Moneda',
    description: 'Eliminar Moneda basado en la identificación',
  })
  @ApiOkResponse({
    type: String,
    description: 'Moneda eliminada correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyMonedaById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.monedaService.deleteMoneda(id);
  }
}
