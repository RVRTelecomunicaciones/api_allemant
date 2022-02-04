import { ClasificacionInvolucrado } from '@app/modules/clasificacion-involucrados/entities/clasificacion-involucrado.entity';
import { SectorInvolucrado } from '@app/modules/sector-involucrados/entities/sector-involucrado.entity';
import { TipoDocumento } from '@app/modules/tipo-documentos/entities/tipo-documento.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsInt, IsOptional, IsString, Max, ValidateIf } from 'class-validator';

export class UpdateInvolucradoJuridicoDto {
  @ApiProperty({
    required: false,
    description: 'Nombre del Involucrado',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Nombre',
  })
  @ValidateIf((o) => o.razon_social != '')
  @IsOptional()
  razon_social: string;

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

  @ApiProperty({ required: false, description: 'Seleccione Tipo de Documento' })
  @IsOptional()
  sector: SectorInvolucrado;

  @ApiProperty({ required: false, description: 'Seleccione Tipo de Documento' })
  @IsOptional()
  clasificacion: ClasificacionInvolucrado;
}
