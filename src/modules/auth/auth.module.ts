import { UserTokenEntity } from './token.entity';
import { UserModule } from './../user/user.module';
import { ApiConfigService } from './../../shared/services/api-config.service';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { Module } from '@nestjs/common';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [
    UserModule,
    TypeOrmModule.forFeature([UserTokenEntity]),
    JwtModule.registerAsync({
      useFactory: (configService: ApiConfigService) => ({
        privateKey: configService.authConfig.privateKey,
        publicKey: configService.authConfig.publicKey,
        signOptions: {
          algorithm: 'RS256',
        },
        verifyOptions: {
          algorithms: ['RS256'],
        },
      }),
      inject: [ApiConfigService],
    }),
  ],
  controllers: [AuthController],
  providers: [AuthService],
  exports: [JwtModule, AuthService],
})
export class AuthModule {}
