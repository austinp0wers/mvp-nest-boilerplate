import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'user_token' })
export class UserTokenEntity {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ type: String, nullable: false })
  user_id: string;

  @Column({ type: String, nullable: false })
  refresh_token: string;

  @Column({ nullable: false })
  expire_at: Date;

  @CreateDateColumn()
  created_at: Date;
}
