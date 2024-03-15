import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Vote } from './entities/vote.entity';
import { Repository } from 'typeorm';
import { VoteInterface } from './interfaces/vote.interface';
import { AddVoteDto } from './dto/vote.dto';

@Injectable()
export class VoteService {
  constructor(
    @InjectRepository(Vote)
    private voteRepository: Repository<VoteInterface>,
  ) {}

  async addVoteService(newVote: AddVoteDto) {
    try {
      const findUser = await this.voteRepository.findOneBy({
        email: newVote.email,
      });
      if (findUser) {
        return { err: 'You have already voted.' };
      } else {
        const vote = await this.voteRepository.save(newVote);
        return vote;
      }
    } catch (err) {
      return { err: 'Voting failed' };
    }
  }

  async getAllVotesService() {
    try {
      const allStudents = await this.voteRepository.find();
      return allStudents;
    } catch (err) {
      return { err: 'Students are not Found' };
    }
  }
}
