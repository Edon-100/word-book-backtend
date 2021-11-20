import { Exclude } from 'class-transformer';
import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';
import { BaseEntity } from '../../common/entity/base.entity';
import * as bcrypt from 'bcrypt';

@Entity('users')
export class UserEntity extends BaseEntity {
  @PrimaryGeneratedColumn('increment', { comment: '主键id' })
  id: number;

  @Column({ unique: true, nullable: false })
  username: string;

  @Column({ unique: true, nullable: true })
  email: string;

  @Exclude()
  @Column({
    nullable: true,
    select: false,
    transformer: {
      to: (val) => {
        const salt = bcrypt.genSaltSync();
        const hashPwd = bcrypt.hashSync(val, salt);
        return hashPwd;
      },
      from: (val) => val,
    },
  })
  password: string;

  @Column({ nullable: true })
  phone: string;
}
