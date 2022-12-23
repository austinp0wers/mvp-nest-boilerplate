import { LoginDataDto } from './dto/loginData.dto';
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

  async validateUser(loginDataDto: LoginDataDto): Promise<boolean> {
    const isUserValid = this.userService.isUserValid(loginDataDto);
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
