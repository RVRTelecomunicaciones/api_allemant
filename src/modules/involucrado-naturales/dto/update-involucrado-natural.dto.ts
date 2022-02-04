import { TipoDocumento } from '@app/modules/tipo-documentos/entities/tipo-documento.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, ValidateIf } from 'class-validator';

export class UpdateInvolucradoNaturalDto {
  @ApiProperty({
    required: false,
    description: 'Apellido Paterno del Involucrado',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Apellido Paterno',
  })
  @ValidateIf((o) => o.paterno != '')
  @IsOptional()
  paterno: string;

  @ApiProperty({
    required: false,
    description: 'Apellido Materno del Involucrado',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Apellido Materno',
  })
  @ValidateIf((o) => o.materno != '')
  @IsOptional()
  materno: string;

  @ApiProperty({
    required: false,
    description: 'Nombre del Involucrado',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Nombre',
  })
  @ValidateIf((o) => o.nombre != '')
  @IsOptional()
  nombre: string;

  @ApiProperty({ required: false, description: 'Seleccione Tipo de Documento' })
  @IsOptional()
  tipoDocumento: TipoDocumento;

  @ApiProperty({
    required: false,
    description: 'Número de Documento del Involucrado',
  })
  @ValidateIf((o) => o.nro_documento != 0)
  @IsOptional()
  nro_documento: string;

  @ApiProperty({
    required: false,
    description: 'Teléfono del Involucrado',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Teléfono',
  })
  @ValidateIf((o) => o.telefono != '')
  @IsOptional()
  telefono: string;

  @ApiProperty({
    required: false,
    description: 'Celular 1 del Involucrado',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Celular 1',
  })
  @ValidateIf((o) => o.celular1 != '')
  @IsOptional()
  celular1: string;

  @ApiProperty({
    required: false,
    description: 'Celular 2 del Involucrado',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Celular 2',
  })
  @ValidateIf((o) => o.celular2 != '')
  @IsOptional()
  celular2: string;

  @ApiProperty({
    required: false,
    description: 'Dirección del Involucrado',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Dirección',
  })
  @ValidateIf((o) => o.direccion != '')
  @IsOptional()
  direccion: string;

  @ApiProperty({
    required: false,
    description: 'Correo del Involucrado',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Correo',
  })
  @ValidateIf((o) => o.correo != '')
  @IsOptional()
  correo: string;
}
