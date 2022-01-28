import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTipoCotizacionDto {
  @ApiProperty({ required: true, description: 'Nombre del Tipo de Cotización' })
  @IsNotEmpty({
    message: 'Requiere obligatoriamente ingresar un Tipo de Cotización',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Tipo de Cotización',
  })
  @Length(4, 20, {
    message: 'Se requiere de 4 a 20 caracteres',
  })
  nombre: string;
}
