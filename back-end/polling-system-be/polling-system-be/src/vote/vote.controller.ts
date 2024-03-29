import { Body, Controller, Get, Inject, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { VoteService } from './vote.service';
import { AddVoteDto } from './dto/vote.dto';

@Controller('vote')
export class VoteController {
  constructor(
    @Inject('VOTE_SERVICE')
    private readonly voteService: VoteService,
  ) {}

  @Post()
  async addVote(@Body() newVote: AddVoteDto, @Res() res: Response) {
    try {
      const userVote = await this.voteService.addVoteService(newVote);
      res.status(200);
      res.json(userVote);
      return;
    } catch (err) {
      res.status(400);
    }
  }

  @Get()
  async getAllvotes(@Res() res: Response) {
    try {
      const votes = await this.voteService.getAllVotesService();
      res.status(200);
      res.json(votes);
    } catch (err) {
      res.status(400);
    }
  }
}
