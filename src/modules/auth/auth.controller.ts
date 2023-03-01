import { UserService } from './../user/user.service';
import { RegisterResponseDto } from './dtos/registerResponse.dto';
import { RegisterDataDto } from './dtos/registerData.dto';
import { LoginResponseDto } from './dtos/loginResponse.dto';
import { ResponseInterceptor } from './../../interceptors/response.interceptor';
import { LoginDataDto } from './dtos/loginData.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseInterceptors,
} from '@nestjs/common';

@Controller('auth')
@UseInterceptors(new ResponseInterceptor())
export class AuthController {
  constructor(
    private authService: AuthService,
    private userService: UserService,
  ) {}

  @Post('login')
  async userLogin(@Req() req, @Res() res, @Body() loginDataDto: LoginDataDto) {
    const user = await this.authService.validateUser(loginDataDto);
    const access_token = await this.authService.createAccessToken({
      role: user.role,
      userId: user.id,
      type: 'accessToken',
    });
    const refresh_token = await this.authService.createAccessToken({
      role: user.role,
      userId: user.id,
      type: 'refreshToken',
    });

    await this.authService.storeRefreshToken(
      user.id,
      refresh_token.token,
      new Date(Date.now() + 7 * 24 * 60 * 60 * 1000),
    );
    return res.json(
      new LoginResponseDto(
        { success: true, code: 200 },
        access_token.token,
        refresh_token.token,
      ),
    );
  }

  @Post('register')
  async userRegister(
    @Req() req,
    @Res() res,
    @Body() registerData: RegisterDataDto,
  ): Promise<RegisterResponseDto> {
    await this.userService.createUser(registerData);

    return res.json(new RegisterResponseDto(200, 'OK', true));
  }

  @Post('refresh-token')
  public async validRefreshToken() {
    // const userId = await this.authService.
  }
}
