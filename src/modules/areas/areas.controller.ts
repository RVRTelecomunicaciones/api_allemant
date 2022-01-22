import { Controller, Get } from '@nestjs/common';
import { ApiTags } from '@nestjs/swagger';
import { AreasService } from './areas.service';

@ApiTags('ÁREAS')
@Controller('areas/')
export class AreasController {
  constructor(private areaService: AreasService) {}

  @Get('list')
  listar() {
    return this.areaService.findAll();
  }
}
