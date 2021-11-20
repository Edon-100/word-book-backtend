import { BaseEntity } from 'src/common/entity/base.entity';
import { Entity, Column, PrimaryColumn, PrimaryGeneratedColumn } from 'typeorm';

@Entity('word')
export class WordEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ nullable: false })
  userId: string;

  @Column()
  text: string;

  @Column({
    transformer: {
      to: (val) => val,
      from: (val) => {
        console.log(val, val.split('/n'));
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
