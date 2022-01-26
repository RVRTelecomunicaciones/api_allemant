import { Module } from '@nestjs/common';
import { EstadoCotizacionesService } from './estado-cotizaciones.service';
import { EstadoCotizacionesController } from './estado-cotizaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EstadoCotizacion } from './entities/estado-cotizacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([EstadoCotizacion])],
  providers: [EstadoCotizacionesService],
  controllers: [EstadoCotizacionesController],
})
export class EstadoCotizacionesModule {}
