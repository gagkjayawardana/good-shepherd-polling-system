import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

export enum ResultStatusType {
  YES = 'yes',
  NO = 'no',
}

@Entity()
export class Event extends BaseEntity {
  @PrimaryGeneratedColumn()
  eventId: number;

  @Column()
  startTimet: Date;

  @Column()
  endTime: Date;

  @Column({
    type: 'enum',
    enum: ResultStatusType,
    default: ResultStatusType.YES,
  })
  resultStatus: ResultStatusType;
}
