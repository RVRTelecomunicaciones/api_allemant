import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateAreaDto {
  @ApiProperty({ required: true, description: 'Nombre del Área' })
  @IsNotEmpty({ message: 'Requiere Obligatoriamente ingresar un Área' })
  @IsString({
    message: 'Ingrese texto para la descripción del Área',
  })
  @Length(4, 50, {
    message: 'Se requiere de 4 a 50 caracteres',
  })
  nombre: string;
}
