import { User } from '@app/modules/users/entities/user.entity';
import { ApiProperty } from '@nestjs/swagger';

export class RefreshToken {
  @ApiProperty({ description: 'RefreshToken' })
  refreshToken: string;

  @ApiProperty({ description: 'Usuario' })
  user: User;
}
