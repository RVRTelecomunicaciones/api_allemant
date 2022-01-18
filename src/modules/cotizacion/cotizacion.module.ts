import { Module } from '@nestjs/common';
import { CotizacionService } from './cotizacion.service';
import { CotizacionController } from './cotizacion.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Cotizacion } from './entities/cotizacion.entity';
import { TipoCotizacion } from './entities/tipocotizacion.entity';
import { DesgloseCotizacion } from './entities/desglose-cotizacion.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Cotizacion])],

  providers: [CotizacionService],
  controllers: [CotizacionController],
})
export class CotizacionModule {}
