import { TipoServicio } from '@app/modules/tipo-servicios/entities/tipo-servicio.entity';
import { ApiProperty } from '@nestjs/swagger';
import { Type } from 'class-transformer';
import { IsInt, IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateServicioDto {
  @ApiProperty({
    required: true,
    description: 'Nombre de Servicio',
  })
  @IsNotEmpty({
    message: 'Requiere Obligatoriamente ingresar un nombre del Servicio',
  })
  @IsString({
    message: 'Ingrese texto para la descripción de la Moneda',
  })
  @Length(3, 50, {
    message: 'Se requiere de 3 a 50 caracteres',
  })
  nombre: string;

  @ApiProperty({
    required: true,
    description: 'Seleccione Tipo de Servicio',
  })
  @IsNotEmpty({
    message: 'Requiere Obligatoriamente seleccionar un Tipo de Servicio',
  })
  tipo_servicio: TipoServicio;
}
