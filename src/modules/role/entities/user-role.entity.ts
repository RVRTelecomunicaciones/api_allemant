import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Column, Entity } from 'typeorm';

@Entity('user_has_role')
export class RoleAccessEntity extends SharedEntity {
  @Column({
    type: 'int',
    nullable: false,
    name: 'role_id',
    comment: '角色id',
  })
  roleId: number;

  @Column({
    type: 'int',
    nullable: false,
    name: 'access_id',
    comment: '资源id',
  })
  accessId: number;

  @Column({
    type: 'tinyint',
    name: 'type',
    comment: '资源类型:2:表示菜单,3:表示接口(API)',
  })
  type: number;
}
