import { TipoDocumento } from '@app/modules/tipo-documentos/entities/tipo-documento.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
  Max,
} from 'class-validator';

export class CreateInvolucradoNaturalDto {
  @ApiProperty({ required: true, description: 'Apellido Paterno' })
  @IsNotEmpty({
    message: 'Requiere obligatoriamente ingresar un Apellido Paterno',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Apellido Paterno',
  })
  @Length(4, 50, {
    message: 'se requiere de 4 a 50 caracteres',
  })
  paterno: string;

  @ApiProperty({ required: true, description: 'Apellido Materno' })
  @IsNotEmpty({
    message: 'Requiere obligatoriamente ingresar un Apellido Materno',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Apellido Materno',
  })
  @Length(4, 50, {
    message: 'se requiere de 4 a 50 caracteres',
  })
  materno: string;

  @ApiProperty({ required: true, description: 'Nombre del Involucrado' })
  @IsNotEmpty({ message: 'Requiere obligatoriamente ingresar un Nombre' })
  @IsString({
    message: 'Ingrese texto para la descripción del Nombre del Involucrado',
  })
  @Length(4, 50, {
    message: 'se requiere de 4 a 50 caracteres',
  })
  nombre: string;

  @ApiProperty({ required: true, description: 'Seleccione Tipo de Documento' })
  @IsOptional()
  tipoDocumento: TipoDocumento;

  @ApiProperty({ required: true, description: 'Número de Documento' })
  @IsNotEmpty({
    message: 'Requiere obligatoriamente ingresar el Número de Documento',
  })
  nro_documento: string;

  @ApiProperty({ required: true, description: 'Telefono del Involucrado' })
  @IsString({
    message: 'Ingrese texto para la descripción del Telefono del Involucrado',
  })
  /*@Length(10, 10, {
    message: 'se requiere de 10 caracteres',
  })*/
  @IsOptional()
  telefono: string;

  @ApiProperty({ required: true, description: 'Celular 1 del Involucrado' })
  @IsString({
    message: 'Ingrese texto para la descripción del Celular 1 del Involucrado',
  })
  /*@Length(9, 9, {
    message: 'se requiere de 9 caracteres',
  })*/
  @IsOptional()
  celular1: string;

  @ApiProperty({ required: true, description: 'Celular 2 del Involucrado' })
  @IsString({
    message: 'Ingrese texto para la descripción del Celular 2 del Involucrado',
  })
  /*@Length(9, 9, {
    message: 'se requiere de 9 caracteres',
  })*/
  @IsOptional()
  celular2: string;

  @ApiProperty({ required: true, description: 'Dirección del Involucrado' })
  @IsString({
    message: 'Ingrese texto para la descripción del Dirección del Involucrado',
  })
  @Length(4, 150, {
    message: 'se requiere de 4 a 150 caracteres',
  })
  @IsOptional()
  direccion: string;

  @ApiProperty({ required: true, description: 'Correo del Involucrado' })
  @IsString({
    message: 'Ingrese texto para la descripción del Correo del Involucrado',
  })
  @Length(4, 100, {
    message: 'se requiere de 4 a 100 caracteres',
  })
  @IsOptional()
  correo: string;
}
