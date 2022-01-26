import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateEstadoCotizacionDto {
  @ApiProperty({
    required: false,
    description: 'Nombre del Estado de Cotización',
  })
  @IsString({
    message: 'Ingrese texto para la descripcion del Estado de Cotización',
  })
  @ValidateIf((o) => o.nombre != '')
  @IsOptional()
  nombre: string;
}
