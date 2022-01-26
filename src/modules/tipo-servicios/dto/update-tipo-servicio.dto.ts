import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateTipoServicioDto {
  @ApiProperty({ required: false, description: 'Nombre del Tipo de Servicio' })
  @IsString({
    message: 'Ingrese texto para la descripción del Tipo de Servicio',
  })
  @ValidateIf((o) => o.nombre != '')
  @IsOptional()
  nombre: string;
}
