import { AuthService } from './auth.service';
import { Controller, Post } from '@nestjs/common';

@Controller('auth')
export class AuthController {
  constructor(private authService: AuthService) {}

  @Post('login')
  async userLogin() {
    this.authService.validateUser();

    const loginData = {
      userId: 'userID',
      role: 'manager',
    };
    this.authService.createAccessToken(loginData);
  }

  @Post('register')
  async userRegister() {}
}
