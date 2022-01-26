import { Module } from '@nestjs/common';
import { EstadoCoordinacionesService } from './estado-coordinaciones.service';
import { EstadoCoordinacionesController } from './estado-coordinaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoCoordinacion } from './entities/estado-coordinacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoCoordinacion])],
  providers: [EstadoCoordinacionesService],
  controllers: [EstadoCoordinacionesController],
})
export class EstadoCoordinacionesModule {}
