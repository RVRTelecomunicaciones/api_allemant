import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateMonedaDto {
  @ApiProperty({ required: false, description: 'Código de Moneda' })
  @IsString({
    message: 'Ingrese texto para la descripción del Código',
  })
  @ValidateIf((o) => o.codigo != '')
  @IsOptional()
  codigo: string;

  @ApiProperty({ required: false, description: 'Símbolo de Moneda' })
  @IsString({
    message: 'Ingrese texto para la descripción del Símbolo',
  })
  @ValidateIf((o) => o.simbolo != '')
  @IsOptional()
  simbolo: string;

  @ApiProperty({ required: false, description: 'Nombre de Moneda' })
  @IsString({
    message: 'Ingrese texto para la descripción de la Moneda',
  })
  @ValidateIf((o) => o.nombre != '')
  @IsOptional()
  nombre: string;
}
