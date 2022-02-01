import { TipoServicio } from '@app/modules/tipo-servicios/entities/tipo-servicio.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsString, ValidateIf } from 'class-validator';

export class UpdateServicioDto {
  @ApiProperty({ required: false, description: 'Nombre de Servicio' })
  @IsString({
    message: 'Ingrese texto para la descripción del Servicio',
  })
  @ValidateIf((o) => o.nombre != '')
  @IsOptional()
  nombre: string;

  @ApiProperty({ required: false, description: 'Seleccione Tipo de Servicio' })
  @IsOptional()
  tipoServicio: TipoServicio;
}
