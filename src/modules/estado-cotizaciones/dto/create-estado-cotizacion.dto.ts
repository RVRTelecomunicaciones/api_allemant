import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEstadoCotizacionDto {
  @ApiProperty({
    required: true,
    description: 'Nombre del Estado de Cotización',
  })
  @IsNotEmpty({
    message: 'Requiere obligatoriamente ingresar un Estado de Cotización',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Estado de Cotización',
  })
  @Length(4, 15, {
    message: 'Se requiere de 4 a 15 caracteres',
  })
  nombre: string;
}
