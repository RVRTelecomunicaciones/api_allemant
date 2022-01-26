import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateEstadoCoordinacionDto {
  @ApiProperty({
    required: false,
    description: 'Nombre del Estado de Coordinación',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Estado de Coordinación',
  })
  @ValidateIf((o) => o.nombre != '')
  @IsOptional()
  nombre: string;
}
