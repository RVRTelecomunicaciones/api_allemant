import {
  ConflictException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { User } from './entities/user.entity';

@Injectable()
export class UsersService {
  constructor(
    @InjectRepository(User) private readonly users: Repository<User>,
  ) {}

  public async getUserEntityByUsername(
    username: string,
  ): Promise<User | undefined> {
    return await this.users.findOne({ username });
  }

  public async getUserEntityById(id: number): Promise<User | null> {
    return this.users.findOne({
      where: { id },
    });
  }
  create(dto: CreateUserDto) {
    return this.users.save(dto);
  }
  findOne(id: number) {
    return `This action returns a #${id} user`;
  }

  // eslint-disable-next-line @typescript-eslint/ban-types
  findByCondition(condition: Object) {
    return this.users.findOne(condition);
  }
  async updateUser(userId: number, updateData: UpdateUserDto): Promise<User> {
    try {
      const user = await this.users.findOne(userId);
      if (!user) {
        throw new NotFoundException(
          `Allemant Peritos le informa que el usuario con id "${userId}" no fue encontrado`,
        );
      } else {
        return this.users.save(updateData);
      }
    } catch (err) {
      throw new ConflictException();
    }
  }

  update(id: number, updateUserDto: UpdateUserDto) {
    return this.users.update(id, updateUserDto);
  }
}
