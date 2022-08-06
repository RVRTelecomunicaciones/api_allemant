import { UniqueOnDatabase } from '@app/modules/auth/validations/UniqueValidation';
import { Length, IsString, Matches, IsEmail } from 'class-validator';
import { User } from '../entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto {
  @ApiProperty()
  /* @IsString({ message: 'Ingrese un texto en el nombre de usuario.' })
  @Matches(/(?=^.{4,20}$)^[a-zA-Z]+[a-zA-Z\-\_0-9.]+[a-zA-Z0-9]+$/, {
    message:
      'La cuenta de usuario puede contener letras, números y caracteres en el nombre de usuario. Largo de 4 a 20.',
  }) */
  username: string;

  @ApiProperty()
  /* @UniqueOnDatabase(User, {
    message: 'Un usuario con este correo electrónico ya existe',
  })
  @IsEmail(null, { message: 'Ingrese un email válido' }) */
  email: string;

  @ApiProperty()
  @Length(6, 32, {
    message: 'La contraseña debe tener una longitud de 6 a 32 caracteres',
  })
  password: string;

  activationLink: string;
}
