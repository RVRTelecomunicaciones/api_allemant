import { StatusEnum } from '@app/enums/status.enum';
import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity, Unique, Index } from 'typeorm';

@Entity('role')
@Unique('name_deleted', ['name', 'deletedAt'])
export class RoleEntity extends SharedEntity {
  @Index()
  @Column({
    type: 'varchar',
    nullable: false,
    length: 50,
    name: 'name',
  })
  name: string;

  @Column({
    type: 'varchar',
    nullable: true,
    length: 100,
    name: 'description',
  })
  description: string;

  @Column({
    type: 'tinyint',
    nullable: true,
    default: 1,
    name: 'status',
  })
  status: StatusEnum;
}
