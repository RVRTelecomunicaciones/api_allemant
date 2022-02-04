import { Module } from '@nestjs/common';
import { InvolucradoJuridicosService } from './involucrado-juridicos.service';
import { InvolucradoJuridicosController } from './involucrado-juridicos.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvolucradoJuridico } from './entities/involucrado-juridico.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvolucradoJuridico])],
  providers: [InvolucradoJuridicosService],
  controllers: [InvolucradoJuridicosController],
})
export class InvolucradoJuridicosModule {}
