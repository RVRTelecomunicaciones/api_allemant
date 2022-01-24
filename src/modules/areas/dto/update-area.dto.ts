import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateAreaDto {
  @ApiProperty({ required: false, description: 'Nombre del Área' })
  @IsString({
    message: 'Ingrese texto para la descripción del Área',
  })
  @ValidateIf((o) => o.name != '')
  @IsOptional()
  nombre: string;
}
