import { LoginResponseDto } from './dto/loginResponse.dto';
import { ResponseInterceptor } from './../../interceptors/response.interceptor';
import { LoginDataDto } from './dto/loginData.dto';
import { AuthService } from './auth.service';
import {
  Body,
  Controller,
  Post,
  Req,
  Res,
  UseGuards,
  UseInterceptors,
} from '@nestjs/common';

@UseGuards()
@Controller('auth')
@UseInterceptors(new ResponseInterceptor())
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async userLogin(@Req() req, @Res() res, @Body() loginDataDto: LoginDataDto) {
    const user = await this.authService.validateUser(loginDataDto);

    const access_token = await this.authService.createAccessToken({
      userId: user.id,
      role: user.role,
    });

    return new LoginResponseDto({ success: true, code: 200 }, access_token);
  }

  @Post('register')
  async userRegister(@Req() req, @Res() res, @Body() registerData) {}
}
