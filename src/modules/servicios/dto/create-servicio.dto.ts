import { Requisito } from '@app/modules/requisitos/entities/requisito.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';
import { Servicio } from '../entities/servicio.entity';
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
  @Length(3, 60, {
    message: 'Se requiere de 3 a 60 caracteres',
  })
  nombre?: string;

  /*  @Type(() => TipoServicio)
  @ValidateNested() */
  @ApiProperty({
    required: true,
    description: 'Seleccione Tipo de Servicio',
  })
  @IsNotEmpty({
    message: 'Requiere Obligatoriamente seleccionar un Tipo de Servicio',
  })
  tipoServicio?: Servicio;

  @ApiProperty({
    required: true,
    description: 'Seleccione Tipo de Servicio',
  })
  @IsNotEmpty({
    message: 'Requiere Obligatoriamente seleccionar un Tipo de Servicio',
  })
  requisito?: Requisito[];
}
