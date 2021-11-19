import { BaseEntity } from 'src/common/entity/base.entity';
import { Entity, Column, PrimaryColumn } from 'typeorm';

@Entity('word')
export class WordEntity extends BaseEntity {
  @PrimaryColumn()
  userId: number;

  @Column()
  text: string;

  @Column()
  lastLeanDate: Date;

  @Column()
  studyLevel: string;
}
