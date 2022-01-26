import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateTipoCotizacionDto {
  @ApiProperty({
    required: false,
    description: 'Nombre del Tipo de Cotización',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Tipo de Cotización',
  })
  @ValidateIf((o) => o.nombre != '')
  @IsOptional()
  nombre: string;
}
