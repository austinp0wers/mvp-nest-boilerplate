import { TokenTypes } from '../../common/token-type';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

@Injectable()
export class AuthService {
  constructor(private jwtService: JwtService) {}

  async createAccessToken(loginData) {
    const accessToken = await this.jwtService.signAsync({
      userId: loginData.userId,
      type: TokenTypes.ACCESS_TOKEN,
      role: loginData.role,
    });
    return accessToken;
  }

  async validateUser() {}
}
