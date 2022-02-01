import { Module } from '@nestjs/common';
import { RequisitosService } from './requisitos.service';
import { RequisitosController } from './requisitos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Requisito } from './entities/requisito.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Requisito])],
  providers: [RequisitosService],
  controllers: [RequisitosController],
})
export class RequisitosModule {}
