import { User } from '@app/modules/users/entities/user.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ObjectID,
  OneToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity()
export class Token {
  @PrimaryGeneratedColumn()
  id: ObjectID;

  @Column()
  refreshToken: string;

  @OneToOne(() => User)
  @JoinColumn()
  user: User;
}
