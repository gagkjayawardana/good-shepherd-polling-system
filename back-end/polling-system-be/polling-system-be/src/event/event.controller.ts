import {
  Body,
  Controller,
  Delete,
  Get,
  Inject,
  Post,
  Put,
  Res,
} from '@nestjs/common';
import { EventService } from './event.service';
import { Response } from 'express';
import { AddEventDto, UpdateEventDto } from './dto/event.dto';

@Controller('vote')
export class EventController {
  constructor(
    @Inject('EVENT_SERVICE')
    private readonly eventService: EventService,
  ) {}

  @Post()
  async addVote(@Body() newEvent: AddEventDto, @Res() res: Response) {
    try {
      const event = await this.eventService.createEventService(newEvent);
      res.status(200);
      res.json(event);
      return;
    } catch (err) {
      res.status(400);
    }
  }

  @Get()
  async getLastEvent(@Res() res: Response) {
    try {
      const event = await this.eventService.getLastEventService();
      res.status(200);
      res.json(event);
    } catch (err) {
      res.status(400);
    }
  }

  @Delete()
  async deleteStudent(@Res() res: Response) {
    try {
      const result = await this.eventService.deleteEventService();
      res.status(200);
      res.json(result);
    } catch (err) {
      res.status(400);
    }
  }

  @Put('/status')
  async updateStatus(@Body() newStatus: UpdateEventDto, @Res() res: Response) {
    try {
      const result = await this.eventService.updateStstusService(newStatus);
      res.status(200);
      res.json(result);
    } catch (err) {
      res.status(400);
    }
  }
}
