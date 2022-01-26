import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateEstadoCoordinacionDto {
  @ApiProperty({
    required: true,
    description: 'Nombre de Estado de Coordinación',
  })
  @IsNotEmpty({
    message: 'Requiere obligatoriamente ingresar un Estado de Coordinación',
  })
  @IsString({
    message: 'Ingrese texto para la desripción del Estado de Coordinación',
  })
  @Length(4, 20, {
    message: 'Se requiere 4 a 20 caracteres',
  })
  nombre: string;
}
