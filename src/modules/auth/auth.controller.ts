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
  async userLogin(@Req() req, @Res() res, @Body() loginData: LoginDataDto) {
    this.authService.validateUser();

    this.authService.createAccessToken(loginData);
  }

  @Post('register')
  async userRegister(@Req() req, @Res() res, @Body() registerData) {}
}
