import { Module } from '@nestjs/common';
import { TipoServiciosService } from './tipo-servicios.service';
import { TipoServiciosController } from './tipo-servicios.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TipoServicio } from './entities/tipo-servicio.entity';

@Module({
  imports: [TypeOrmModule.forFeature([TipoServicio])],
  providers: [TipoServiciosService],
  controllers: [TipoServiciosController],
})
export class TipoServiciosModule {}
