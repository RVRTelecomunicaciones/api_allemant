import { Module } from '@nestjs/common';
import { ClasificacionInvolucradosService } from './clasificacion-involucrados.service';
import { ClasificacionInvolucradosController } from './clasificacion-involucrados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ClasificacionInvolucrado } from './entities/clasificacion-involucrado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([ClasificacionInvolucrado])],
  providers: [ClasificacionInvolucradosService],
  controllers: [ClasificacionInvolucradosController],
})
export class ClasificacionInvolucradosModule {}
