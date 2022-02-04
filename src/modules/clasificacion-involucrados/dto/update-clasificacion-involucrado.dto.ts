import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateClasificacionInvolucradoDto {
  @ApiProperty({
    required: false,
    description: 'Nombre de la Clasificación de Involucrados',
  })
  @IsString({
    message:
      'Ingrese texto para la descripción de la Clasificación de Involucrados',
  })
  @ValidateIf((o) => o.nombre != '')
  @IsOptional()
  nombre: string;
}
