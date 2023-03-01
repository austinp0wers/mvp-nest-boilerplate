import { UserTokenEntity } from './token.entity';
import { UserRoleEnum } from './../user/enums/role.enum';
import { CustomNotFoundException } from './../../exceptions/customNotFound.exception';
import { TokenPayloadDto } from './dtos/tokenPayload.dto';
import { UserEntity } from './../user/user.entity';
import { LoginDataDto } from './dtos/loginData.dto';
import { UserService } from './../user/user.service';
import { TokenTypes } from '../../common/enums/token-type';
import { Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { validatePasswordHash } from 'src/common/utils';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class AuthService {
  constructor(
    private jwtService: JwtService,
    private userService: UserService,
    @InjectRepository(UserTokenEntity)
    private userTokenRepo: Repository<UserTokenEntity>,
  ) {}

  async validateUser(loginDataDto: LoginDataDto): Promise<UserEntity | null> {
    const user = await this.userService.findOneByEmail({
      email: loginDataDto.email,
    });
    if (!user) {
      throw new CustomNotFoundException('User not found');
    }

    const isPasswordValid = await validatePasswordHash(
      loginDataDto.password,
      user.password,
    );

    if (!isPasswordValid) throw new CustomNotFoundException('User not found');

    return user;
  }

  async createAccessToken(loginData: {
    role: UserRoleEnum;
    userId: string;
    type: string;
  }) {
    return new TokenPayloadDto({
      expiresIn:
        loginData.type === 'accessToken'
          ? Number(process.env.ACCESS_TOKEN_EXPIRE)
          : Number(process.env.REFRESH_TOKEN_EXPIRE),
      token: await this.jwtService.signAsync({
        userId: loginData.userId,
        type: TokenTypes.ACCESS_TOKEN,
        role: loginData.role,
        expiresIn:
          loginData.type === 'accessToken'
            ? Number(process.env.ACCESS_TOKEN_EXPIRE)
            : Number(process.env.REFRESH_TOKEN_EXPIRE),
      }),
    });
  }

  public async storeRefreshToken(
    user_id: string,
    token: string,
    expire_at: Date,
  ) {
    const refreshToken = new UserTokenEntity();
    refreshToken.user_id = user_id;
    refreshToken.refresh_token = token;
    refreshToken.expire_at = expire_at;
    await this.userTokenRepo.insert(refreshToken);
  }
}
