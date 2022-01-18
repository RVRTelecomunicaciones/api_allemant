import { User } from '@app/modules/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';

export class RefreshTokenDTO {
  @ApiProperty()
  refreshToken: string;

  @ApiProperty({ description: 'Usuario' })
  user?: User;
}
