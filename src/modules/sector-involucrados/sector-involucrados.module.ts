import { Module } from '@nestjs/common';
import { SectorInvolucradosService } from './sector-involucrados.service';
import { SectorInvolucradosController } from './sector-involucrados.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { SectorInvolucrado } from './entities/sector-involucrado.entity';

@Module({
  imports: [TypeOrmModule.forFeature([SectorInvolucrado])],
  providers: [SectorInvolucradosService],
  controllers: [SectorInvolucradosController],
})
export class SectorInvolucradosModule {}
