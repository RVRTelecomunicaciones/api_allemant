import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateRequisitoDto {
  @ApiProperty({
    required: true,
    description: 'Nombre de Requisito',
  })
  @IsNotEmpty({
    message: 'Requiere obligatoriamente ingresar un Nombre de Requisito',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Requisito',
  })
  @Length(3, 25, {
    message: 'Se requiere de 3 a 25 caracteres',
  })
  nombre: string;
}
