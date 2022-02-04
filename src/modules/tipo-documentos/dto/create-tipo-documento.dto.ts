import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsNotEmpty, IsString, Length, Max } from 'class-validator';

export class CreateTipoDocumentoDto {
  @ApiProperty({ required: true, description: 'Código del Tipo de Documento' })
  @IsNotEmpty({
    message: 'Requiere obligatoriamente ingresar un Código',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Código',
  })
  @Length(1, 2, {
    message: 'Se requiere de 1 a 2 caracteres',
  })
  codigo: string;

  @ApiProperty({
    required: true,
    description: 'Abreviatura del Tipo de Documento',
  })
  @IsNotEmpty({
    message: 'Requiere obligatoriamente ingresar una Abreviatura',
  })
  @IsString({
    message: 'Ingrese texto para la descripción de la Abreviatura',
  })
  @Length(3, 20, {
    message: 'Se requiere de 3 a 20 caracteres',
  })
  abreviatura: string;

  @ApiProperty({ required: true, description: 'Nombre del Tipo de Documento' })
  @IsNotEmpty({
    message: 'Requiere obligatoriamente ingresar un Tipo de Documento',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Tipo de Documento',
  })
  @Length(4, 50, {
    message: 'Se requiere de 4 a 50 caracteres',
  })
  nombre: string;

  @ApiProperty({
    required: true,
    description: 'Longitud del Tipo de Documento',
  })
  @IsNotEmpty({
    message: 'Requiere obligatoriamente ingresar una longitud',
  })
  @IsInt({
    message: 'Solo se permiten números',
  })
  /*@Max(2, {
    message: 'requieren maximo 2 caracteres',
  })*/
  longitud: number;
}
