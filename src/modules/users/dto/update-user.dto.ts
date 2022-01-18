import { ApiProperty } from '@nestjs/swagger';
import { IsOptional, IsBase64, IsEmail, Length } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty()
  @IsOptional()
  name: string;

  @ApiProperty()
  @IsOptional()
  @IsBase64({
    message:
      'Allemant Peritos foto de perfil sea codificada en base64 como formato válido.',
  })
  profilePhoto: string;

  @ApiProperty()
  @IsEmail(null, { message: 'Ingrese un email válido' })
  email: string;

  @ApiProperty()
  @Length(6, 32, {
    message: 'La contraseña debe tener una longitud de 6 a 32 caracteres',
  })
  password: string;

  @ApiProperty()
  @IsOptional()
  activationLink?: string;
}
