import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateSectorInvolucradoDto {
  @ApiProperty({
    required: false,
    description: 'Nombre del Sector de Involucrados',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Sector de Involucrados',
  })
  @ValidateIf((o) => o.nombre != '')
  @IsOptional()
  nombre: string;
}
