import {
  BadRequestException,
  ConflictException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { TokensService } from '../tokens/tokens.service';
import { User } from '../users/entities/user.entity';
import { UsersService } from '../users/users.service';
import { IToken } from '../tokens/interfaces/token.interface';
import { RefreshTokenDTO } from '../tokens/dto/refresh-token.dto';
import { CreateUserDto } from '../users/dto/create-user.dto';
import * as bcrypt from 'bcrypt';
import { v4 } from 'uuid';
import * as APP_CONFIG from '@app/app.config';
import { HelperModule } from '@app/processors/helper/helper.module';
import { EmailService } from '@app/processors/helper/mail/helper.service.email';
import { LoginUserDto } from '../users/dto/login-user.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private tokenService: TokensService,
    private mailService: EmailService,
  ) {}
  async validateUser(dto: LoginUserDto): Promise<any> {
    console.log(dto);

    const user = await this.userService.findByCondition({
      select: ['id', 'name', 'username', 'email', 'password', 'isActivated'],
      where: { username: dto.username },
    });

    if (!user) return null;

    const isPassEqual = await bcrypt.compare(dto.password, user.password);
    console.log(isPassEqual);

    if (!isPassEqual) return null;

    const { password, ...result } = user;

    console.log('MYRESULT');
    console.log(user);

    return result;
  }
  async validateRefreshToken(user, refreshToken: string) {
    console.log('tokens');

    const token = this.tokenService.findOne({ refreshToken });

    if (!token) throw new UnauthorizedException();

    const tokens: IToken = this.tokenService.generateJwtTokens(user);
    await this.tokenService.updateOrCreate(user.id, tokens.refreshToken);
    console.log('tokens');
    console.log('MYRESULT');
    console.log(tokens);

    return {
      user,
      ...tokens,
    };
  }
  async login(user: User) {
    /*     const { refreshToken, user } = refreshTokenDto;
     */ /*     const normalizedIdentifier = user.username.toLowerCase();
     */
    console.log('Lllego tokens');
    console.log(user);
    const tokens: IToken = await this.tokenService.generateJwtTokens(user);
    await this.tokenService.updateOrCreate(user.id, tokens.refreshToken);
    console.log(tokens);
    return {
      user,
      ...tokens,
    };
  }

  async register(createUserDto: CreateUserDto) {
    const candidate = await this.userService.getUserEntityByUsername(
      createUserDto.username,
    );

    if (candidate) {
      throw new ConflictException(
        'Un usuario con este correo electrónico ya existe',
      );
    }

    const activationLink = v4();
    const hashPassword = await bcrypt.hash(createUserDto.password, 10);

    const { password, ...userData } = await this.userService.create({
      ...createUserDto,
      password: hashPassword,
      activationLink,
    });

    const tokens: IToken = this.tokenService.generateJwtTokens(userData);

    console.log(tokens);

    await this.tokenService.create(userData.id, tokens.refreshToken);

    await this.mailService.sendVerifyEmailSendGrid(
      createUserDto.username,
      createUserDto.email,
      activationLink,
    );

    return {
      user: userData,
      ...tokens,
    };
  }

  async activation(activationLink: string) {
    const user = await this.userService.findByCondition({ activationLink });

    console.log('1er Acticación');
    console.log(user);

    if (!user) {
      throw new BadRequestException('Enlace de activación no válido');
      console.log(user);
    }

    user.isActivated = true;
    this.userService.update(user.id, user);
  }

  /*  async verifyEmail(refreshtoken: string): Promise<void> {
    const refreshtokenVerification =
      await this.tokenService.findOneRefreshToken({
        refreshToken: refreshtoken,
      });
    console.log('LLEGO');

    console.log(refreshtokenVerification);
  } */
}
