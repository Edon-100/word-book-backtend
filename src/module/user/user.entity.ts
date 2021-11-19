import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { comment: '主键id' })
  id: number;

  @Column({ unique: true, nullable: false })
  account: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Exclude()
  @Column({ nullable: true, select: false })
  password: string;

  @Column({ nullable: true })
  phone: string;
}
