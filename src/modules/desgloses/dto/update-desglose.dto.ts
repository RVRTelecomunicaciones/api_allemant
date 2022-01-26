import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateDesgloseDto {
  @ApiProperty({ required: false, description: 'Nombre del Desglose' })
  @IsString({ message: 'Ingrese texto para la descripción del Desglose' })
  @ValidateIf((o) => o.nombre != '')
  @IsOptional()
  nombre: string;
}
