import { ApiConfigService } from './../../shared/services/api-config.service';
import { TokenPayloadDto } from './dto/tokenPayload.dto';
import { UserEntity } from './../user/user.entity';
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
    private configService: ApiConfigService,
  ) {}

  async validateUser(loginDataDto: LoginDataDto): Promise<UserEntity | null> {
    return await this.userService.findOneByEmail({
      email: loginDataDto.email,
    });
  }

  async createAccessToken(loginData) {
    return new TokenPayloadDto({
      expiresIn: this.configService.authConfig.jwtExpirationTime,
      accessToken: await this.jwtService.signAsync({
        userId: loginData.userId,
        type: TokenTypes.ACCESS_TOKEN,
        role: loginData.role,
      }),
    });
  }
}
