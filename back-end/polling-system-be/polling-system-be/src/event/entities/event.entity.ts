import {
  Entity,
  Column,
  PrimaryGeneratedColumn,
  BaseEntity,
  CreateDateColumn,
  UpdateDateColumn,
} from 'typeorm';

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
}
