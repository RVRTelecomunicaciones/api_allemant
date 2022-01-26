import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, Length } from 'class-validator';

export class CreateDesgloseDto {
  @ApiProperty({ required: true, description: 'Nombre del Desglose' })
  @IsNotEmpty({ message: 'Requiere obligatoriamente ingresar un Desglose' })
  @IsString({
    message: 'Ingrese texto para la descripción del Desglose',
  })
  @Length(4, 20, {
    message: 'se requiere de 4 a 20 caracteres',
  })
  nombre: string;
}
