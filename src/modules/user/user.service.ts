import { LoginDataDto } from './../auth/dto/loginData.dto';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async isUserValid(loginDataDto: LoginDataDto): Promise<boolean> {
    const user = this.userRepository.findUserByLoginInfo({ ...loginDataDto });
    if (!user) return false;
    return true;
  }
}
