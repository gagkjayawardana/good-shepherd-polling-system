import { Entity, Column, PrimaryGeneratedColumn, BaseEntity } from 'typeorm';

@Entity()
export class Vote extends BaseEntity {
  @PrimaryGeneratedColumn()
  voteId: number;

  @Column({
    unique: true,
  })
  email: string;

  @Column()
  vote: string;
}
