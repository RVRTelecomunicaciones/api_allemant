import { Module } from '@nestjs/common';
import { TipoCotizacionesService } from './tipo-cotizaciones.service';
import { TipoCotizacionesController } from './tipo-cotizaciones.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoCotizacion } from './entities/tipo-cotizacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoCotizacion])],
  providers: [TipoCotizacionesService],
  controllers: [TipoCotizacionesController],
})
export class TipoCotizacionesModule {}
