import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateMonedaDto {
  @ApiProperty({
    required: true,
    description: 'Código de Moneda',
  })
  @IsNotEmpty({
    message: 'Requiere Obligatoriamente ingresar un Código',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Código',
  })
  @Length(3, 3, {
    message: 'Se requiere 3 caracteres',
  })
  codigo: string;

  @ApiProperty({
    required: true,
    description: 'Símbolo de Moneda',
  })
  @IsNotEmpty({
    message: 'Requiere Obligatoriamente ingresar un Símbolo',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Símbolo',
  })
  @Length(1, 10, {
    message: 'Se requiere de 1 a 10 caracteres',
  })
  simbolo: string;

  @ApiProperty({
    required: true,
    description: 'Nombre de Moneda',
  })
  @IsNotEmpty({
    message: 'Requiere Obligatoriamente ingresar un Nombre de Moneda',
  })
  @IsString({
    message: 'Ingrese texto para la descripción de la Moneda',
  })
  @Length(3, 3, {
    message: 'Se requiere 3 caracteres',
  })
  nombre: string;
}
