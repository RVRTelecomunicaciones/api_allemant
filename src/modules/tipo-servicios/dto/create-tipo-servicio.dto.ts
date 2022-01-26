import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateTipoServicioDto {
  @ApiProperty({ required: true, description: 'Nombre del Tipo de Servicio' })
  @IsNotEmpty({
    message: 'Requiere obligatoriamente ingresar un Tipo de Servicio',
  })
  @IsString({
    message: 'Ingrese texto para la descripción del Tipo de Servicio',
  })
  @Length(4, 50, {
    message: 'Se requiere de 4 a 50 caracteres',
  })
  nombre: string;
}
