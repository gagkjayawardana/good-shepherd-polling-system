import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

export enum ResultStatusType {
  YES = 'yes',
  NO = 'no',
}

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  eventId: number;

  @Column()
  @CreateDateColumn()
  startTimet: Date;

  @Column()
  @UpdateDateColumn()
  endTime: Date;

  @Column({
    type: 'enum',
    enum: ResultStatusType,
    default: ResultStatusType.YES,
  })
  resultStatus: ResultStatusType;
}
