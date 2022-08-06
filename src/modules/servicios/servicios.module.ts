import { Module } from '@nestjs/common';
import { ServiciosService } from './servicios.service';
import { ServiciosController } from './servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Servicio } from './entities/servicio.entity';
import { RequisitosService } from '../requisitos/requisitos.service';
import { Requisito } from '../requisitos/entities/requisito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Servicio, Requisito])],
  providers: [ServiciosService, RequisitosService],
  controllers: [ServiciosController],
  exports: [ServiciosService, RequisitosService],
})
export class ServiciosModule {}
