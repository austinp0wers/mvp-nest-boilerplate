import { UserEntity } from './user.entity';
import { Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';

@Injectable()
export class UserRepository {
  constructor() {} // @InjectRepository(UserEntity) private userEntity: Repository<UserEntity>,

  //: Promise<UserEntity | null>
  public findOne(userInfo) {
    // return this.userEntity.findOneBy(userInfo);
  }
}
