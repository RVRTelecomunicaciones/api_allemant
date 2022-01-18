import {
  Body,
  Controller,
  Get,
  HttpCode,
  HttpStatus,
  Param,
  Post,
  Query,
  Req,
  Res,
  UseGuards,
} from '@nestjs/common';
import { TokensService } from '../tokens/tokens.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { AuthService } from './auth.service';
import { Response } from 'express';
import { RefreshJwtAuthGuard } from './guards/refresh-jwt-auth.guard';
import { LocalAuthGuard } from './guards/local-auth.guard';
import { ApiTags } from '@nestjs/swagger';
import * as APP_CONFIG from '@app/app.config';

@ApiTags('AUTENTICACIÓN')
@Controller('auth/')
export class AuthController {
  constructor(
    private readonly authService: AuthService,
    private readonly tokenService: TokensService,
  ) {}

  @UseGuards(LocalAuthGuard)
  @Post('login')
  async login(@Res({ passthrough: true }) response: Response, @Req() req) {
    console.log('user');
    console.log(req);

    const user = await this.authService.login(req.user);

    console.log('user');
    console.log(user);
    response.cookie('refresh Token', user.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    return user;
  }

  @Post('register')
  async register(
    @Res({ passthrough: true }) response: Response,
    @Body() dto: CreateUserDto,
  ) {
    const user = await this.authService.register(dto);
    response.cookie('refreshToken', user.refreshToken, {
      maxAge: 1000 * 60 * 60 * 24 * 30,
      httpOnly: true,
    });
    return user;
  }

  @Get('activation/:link')
  async activation(
    @Res({ passthrough: true }) response: Response,
    @Param('link') link: string,
  ) {
    await this.authService.activation(link);
    response.redirect(APP_CONFIG.PROJECT_EMAIL.url);
  }

  @UseGuards(RefreshJwtAuthGuard)
  @Get('refresh')
  refresh(@Req() req, @Body() body) {
    console.log(req);
    console.log(body);
  }

  @Get('verify')
  @HttpCode(HttpStatus.OK)
  async verifyMail(@Query('token') token: string): Promise<void> {
    await this.authService.activation(token);
  }
}
