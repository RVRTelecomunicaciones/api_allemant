import { Module } from '@nestjs/common';
import { InvolucradoNaturalesService } from './involucrado-naturales.service';
import { InvolucradoNaturalesController } from './involucrado-naturales.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { InvolucradoNatural } from './entities/involucrado-natural.entity';

@Module({
  imports: [TypeOrmModule.forFeature([InvolucradoNatural])],
  providers: [InvolucradoNaturalesService],
  controllers: [InvolucradoNaturalesController],
})
export class InvolucradoNaturalesModule {}
