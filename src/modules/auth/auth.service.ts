import { UserService } from './../user/user.service';
import { TokenTypes } from '../../common/token-type';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
  ) {}

  async validateUser() {
    const isUserValid = this.userService.isUserValid();
    if (!isUserValid) return false;
    return true;
  }

  async createAccessToken(loginData) {
    const accessToken = await this.jwtService.signAsync({
      userId: loginData.userId,
      type: TokenTypes.ACCESS_TOKEN,
      role: loginData.role,
    });
    return accessToken;
  }
}
