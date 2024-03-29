import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Event } from './entities/event.entity';
import { EventController } from './event.controller';
import { EventService } from './event.service';
import { Vote } from 'src/vote/entities/vote.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Event, Vote])],
  controllers: [EventController],
  providers: [{ provide: 'EVENT_SERVICE', useClass: EventService }],
})
export class EventModule {}
