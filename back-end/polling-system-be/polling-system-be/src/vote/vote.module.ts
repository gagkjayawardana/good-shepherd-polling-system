import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { VoteController } from './vote.controller';
import { VoteService } from './vote.service';
import { Event } from 'src/event/entities/event.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Vote, Event])],
  controllers: [VoteController],
  providers: [{ provide: 'VOTE_SERVICE', useClass: VoteService }],
})
export class VoteModule {}
