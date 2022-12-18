import { Column, Entity } from 'typeorm';

@Entity({ name: 'users' })
export class UserEntity {
  @Column({ nullable: false })
  name: string;

  @Column({ nullable: false })
  email: string;
}
