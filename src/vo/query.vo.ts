import { ApiProperty } from '@nestjs/swagger';

export class QueryVo {
  @ApiProperty({ description: 'ID' })
  id?: number;

  @ApiProperty({ description: 'Fecha de Creación' })
  createdAt?: Date;

  @ApiProperty({ description: 'Fecha de Actulización' })
  updatedAt?: Date;
}
