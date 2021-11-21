import { Exclude } from 'class-transformer';
import { BaseEntity } from 'src/common/entity/base.entity';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('word')
export class WordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Exclude()
  @Column({ nullable: false, select: false })
  userId: number;

  @Column()
  text: string;

  @Column({
    transformer: {
      to: (val) => val,
      from: (val) => {
        return val.split('/n');
      },
    },
  })
  explains: string;

  @Column({ default: '' })
  phonetic: string;

  @Column()
  lastLeanDate: Date;

  @Column()
  studyLevel: number;

  @Column()
  isWord: boolean;

  @Column()
  done: boolean;
}
