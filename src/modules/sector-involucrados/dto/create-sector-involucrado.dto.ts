import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateSectorInvolucradoDto {
  @ApiProperty({
    required: true,
    description: 'Nombre del Sector de Involucrados',
  })
  @IsNotEmpty({
    message: 'Requiere obligatoriamente ingresar un Sector de Involucrados',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Sector de Involucrados',
  })
  @Length(4, 50, {
    message: 'Se requiere de 4 a 50 caracteres',
  })
  nombre: string;
}
