import { UserEntity } from './user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor(
    @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,
  ) {}

  //: Promise<UserEntity | null>
  public async findUserByEmail(userInfo): Promise<UserEntity | null> {
    return await this.userEntity.findOneBy(userInfo);
  }
}
