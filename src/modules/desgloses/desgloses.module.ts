import { Module } from '@nestjs/common';
import { DesglosesService } from './desgloses.service';
import { DesglosesController } from './desgloses.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Desglose } from './entities/desglose.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Desglose])],
  providers: [DesglosesService],
  controllers: [DesglosesController],
})
export class DesglosesModule {}
