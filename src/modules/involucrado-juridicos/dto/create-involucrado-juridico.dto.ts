import { ClasificacionInvolucrado } from '@app/modules/clasificacion-involucrados/entities/clasificacion-involucrado.entity';
import { SectorInvolucrado } from '@app/modules/sector-involucrados/entities/sector-involucrado.entity';
import { TipoDocumento } from '@app/modules/tipo-documentos/entities/tipo-documento.entity';
import { ApiProperty } from '@nestjs/swagger';
import {
  IsInt,
  IsNotEmpty,
  IsOptional,
  IsString,
  Length,
} from 'class-validator';

export class CreateInvolucradoJuridicoDto {
  @ApiProperty({ required: true, description: 'Nombre del Involucrado' })
  @IsNotEmpty({ message: 'Requiere obligatoriamente ingresar un Nombre' })
  @IsString({
    message: 'Ingrese texto para la descripción del Nombre del Involucrado',
  })
  @Length(4, 150, {
    message: 'se requiere de 4 a 50 caracteres',
  })
  razon_social: string;

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

  @ApiProperty({ required: true, description: 'Seleccione Sector' })
  @IsOptional()
  sector: SectorInvolucrado;

  @ApiProperty({ required: true, description: 'Seleccione Clasificacion' })
  @IsOptional()
  clasificacion: ClasificacionInvolucrado;
}
