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
  UseGuards,
} from '@nestjs/common';
import {
  ApiBearerAuth,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { AreasService } from './areas.service';
import { CreateAreaDto } from './dto/create-area.dto';
import { UpdateAreaDto } from './dto/update-area.dto';
import { Area } from './entities/area.entity';

@ApiTags('ÁREAS')
@ApiBearerAuth()
@ApiAuth()
/* @UseGuards(JwtAuthGuard)
 */ @Controller('areas/')
export class AreasController {
  constructor(private service: AreasService) {}

  @ApiOperation({
    summary: 'Consultar lista de Areas',
    description: 'Consulta de Áreas',
    externalDocs: {
      url: 'xx/list?order=ASC&page=1&take=20',
    },
  })
  @ApiOkResponse({
    description: 'Lista de Área Paginada',
  })
  @Get('list')
  @HttpCode(HttpStatus.OK)
  async listar(
    @Query() pageOptionsDto: PageOptionsDto,
  ): Promise<PageDto<Area>> {
    return this.service.findAll(pageOptionsDto);
  }

  @ApiOperation({
    summary: 'Crear Área',
    description: 'Creación de Áreas de la Empresa',
  })
  @ApiOkResponse({
    type: String,
    description: 'Área creada correctamente',
  })
  @HttpCode(HttpStatus.CREATED)
  @Post()
  async createArea(@Body() createDto: CreateAreaDto): Promise<string> {
    return await this.service.createArea(createDto);
  }

  @ApiOperation({
    summary: 'Modificar Área',
    description: 'Modificar el Área correspondiente',
  })
  @ApiOkResponse({
    type: String,
    description: 'Área modificada correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Patch(':id')
  async modifyAreaById(
    @Param('id', new ParseIntPipe()) id: number,
    @Body() updateDto: UpdateAreaDto,
  ): Promise<string> {
    return await this.service.updateAreaById(id, updateDto);
  }

  @ApiOperation({
    summary: 'Eliminar Área',
    description: 'Eliminar Área basado en la identificación',
  })
  @ApiOkResponse({
    type: String,
    description: 'Área eliminada correctamente',
  })
  @HttpCode(HttpStatus.OK)
  @Delete(':id')
  async destroyAreaById(
    @Param('id', new ParseIntPipe()) id: number,
  ): Promise<string> {
    return await this.service.deleteArea(id);
  }
}
