import { QueryVo } from '@app/vo/query.vo';
import { ApiProperty } from '@nestjs/swagger';

export class ValidateVo extends QueryVo {
  @ApiProperty({ description: '用户名' })
  username?: string;

  @ApiProperty({ description: '邮箱' })
  email?: string;

  @ApiProperty({ description: '手机号码' })
  mobile?: string;
}
