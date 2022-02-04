import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateClasificacionInvolucradoDto {
  @ApiProperty({
    required: true,
    description: 'Nombre de la Clasificación de Involucrados',
  })
  @IsNotEmpty({
    message:
      'Requiere obligatoriamente ingresar una Clasificación de Involucrados',
  })
  @IsString({
    message:
      'Ingrese texto para la descripción de la Clasificación de Involucrados',
  })
  @Length(4, 50, {
    message: 'Se requiere de 4 a 50 caracteres',
  })
  nombre: string;
}
