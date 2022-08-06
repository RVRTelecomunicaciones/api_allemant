import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { Servicio } from '../entities/servicio.entity';

export class ServicioRequisitoReqDto {
  @ApiProperty({
    required: true,
    description: 'Nombre de Servicio',
  })
  @IsNotEmpty({
    message: 'Requiere Obligatoriamente ingresar un nombre del Servicio',
  })
  servicio: Servicio;

  @ApiProperty({
    required: true,
    description: 'Nombre de Requisito',
  })
  @IsNotEmpty({
    message: 'Requiere Obligatoriamente ingresar un nombre del Requisito',
  })
  requisitoId: number[];
}
