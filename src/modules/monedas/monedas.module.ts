import { Module } from '@nestjs/common';
import { MonedasService } from './monedas.service';
import { MonedasController } from './monedas.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Moneda } from './entities/moneda.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Moneda])],
  providers: [MonedasService],
  controllers: [MonedasController],
})
export class MonedasModule {}
