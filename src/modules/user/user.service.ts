import { UserEntity } from './user.entity';
import { UserRepository } from './user.repository';
import { Injectable } from '@nestjs/common';

@Injectable()
export class UserService {
  constructor(private userRepository: UserRepository) {}

  public async findOneByEmail(email: any): Promise<UserEntity | null> {
    return await this.userRepository.findUserByEmail(email);
  }
}
