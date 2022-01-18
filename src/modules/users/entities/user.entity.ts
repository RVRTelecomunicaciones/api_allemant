import { SharedEntity } from '@app/modules/shared/entities/shared.entity';
import { Exclude } from 'class-transformer';
import {
  BeforeInsert,
  BeforeUpdate,
  Column,
  Entity,
  Index,
  Unique,
} from 'typeorm';
import * as bcrypt from 'bcrypt';
import { InternalServerErrorException } from '@nestjs/common';

@Entity('user')
@Unique('username_mobile_email_unique', ['username', 'mobile', 'email'])
@Unique('username_deleted', ['username', 'deletedAt'])
@Unique('email_deleted', ['email', 'deletedAt'])
@Unique('mobile_deleted', ['mobile', 'deletedAt'])
export class User extends SharedEntity {
  @Index()
  @Column()
  email: string;

  @Index()
  @Column()
  username: string;
  @Index()
  @Column({
    type: 'varchar',
    nullable: true,
    length: 11,
    name: 'mobile',
  })
  mobile: string;
  @Exclude()
  @Column({
    type: 'varchar',
    length: 100,
    name: 'password',
    select: false,
  })
  password: string;

  @Column({ nullable: true })
  name: string;

  @Column({ nullable: true })
  profilePhoto: string;
  @Column({ select: false })
  activationLink: string;
  @Column({ select: false, default: false })
  isActivated?: boolean;

  @BeforeInsert()
  @BeforeUpdate()
  async hashPassword(): Promise<void> {
    if (this.password !== undefined) {
      try {
        this.password = await bcrypt.hash(this.password, 10);
      } catch (error) {
        console.log('hashPassword error', error);
        throw new InternalServerErrorException();
      }
    }
  }

  async checkPassword(password: string): Promise<boolean> {
    try {
      const isCorrectPassword = await bcrypt.compare(password, this.password);
      return isCorrectPassword;
    } catch (error) {
      console.log('checkPassword error', error);
      throw new InternalServerErrorException();
    }
  }
}
