import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { EventInterface } from './interfaces/event.interface';
import { Event } from './entities/event.entity';
import { AddEventDto, UpdateEventDto } from './dto/event.dto';
import { Vote } from 'src/vote/entities/vote.entity';
import { VoteInterface } from 'src/vote/interfaces/vote.interface';

@Injectable()
export class EventService {
  constructor(
    @InjectRepository(Event)
    private eventRepository: Repository<EventInterface>,
    @InjectRepository(Vote)
    private voteRepository: Repository<VoteInterface>,
  ) {}

  async createEventService(newEvent: AddEventDto) {
    try {
      const event = await this.eventRepository.save(newEvent);
      return event;
    } catch (err) {
      return { err: 'Create Event failed' };
    }
  }

  async getLastEventService() {
    try {
      const lastEvent = await this.eventRepository.findOne({
        order: {
          eventId: 'DESC',
        },
      });
      return lastEvent;
    } catch (err) {
      return { err: 'Cannot find event' };
    }
  }

  async deleteEventService() {
    try {
      const deleteEvents = await this.eventRepository.clear();
      const deleteVotes = await this.voteRepository.clear();
      return {
        deleteEvents,
        deleteVotes,
      };
    } catch (err) {
      return { err: 'Deleting error' };
    }
  }

  async updateStstusService(body: UpdateEventDto) {
    try {
      const event = await this.eventRepository.findOne({
        order: {
          eventId: 'DESC',
        },
      });
      if (event) {
        this.eventRepository.merge(event, body);
        return await this.eventRepository.save(event);
      }
    } catch (err) {
      return { err: 'Status not changed' };
    }
  }
}
