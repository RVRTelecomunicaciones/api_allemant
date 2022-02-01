import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateRequisitoDto {
  @ApiProperty({ required: false, description: 'Nombre del Requisito' })
  @IsString({
    message: 'Ingrese texto para la descripción del Requisito',
  })
  @ValidateIf((o) => o.nombre != '')
  @IsOptional()
  nombre: string;
}
