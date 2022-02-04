import { Optional } from '@nestjs/common';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, ValidateIf } from 'class-validator';

export class UpdateTipoDocumentoDto {
  @ApiProperty({ required: false, description: 'Código del Tipo de Documento' })
  @IsString({
    message: 'Ingrese texto para la descripción del Código',
  })
  @ValidateIf((o) => o.codigo != '')
  @IsOptional()
  codigo: string;

  @ApiProperty({
    required: false,
    description: 'Abreviatura del Tipo de Documento',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Abreviatura',
  })
  @ValidateIf((o) => o.abreviatura != '')
  @IsOptional()
  abreviatura: string;

  @ApiProperty({ required: false, description: 'Nombre del Tipo de Documento' })
  @IsString({
    message: 'Ingrese texto para la descripción del Tipo de Documento',
  })
  @ValidateIf((o) => o.nombre != '')
  @IsOptional()
  nombre: string;

  @ApiProperty({
    required: false,
    description: 'Longitud del Tipo de Documento',
  })
  @IsInt({
    message: 'Solo se permiten números',
  })
  @Max(2, {
    message: 'requieren maximo 2 caracteres',
  })
  @Optional()
  longitud: number;
}
