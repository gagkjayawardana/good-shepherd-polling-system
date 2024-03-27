import { MiddlewareConsumer, Module, RequestMethod } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as dotenv from 'dotenv';
import { User } from './user/entities/user.entity';
import { UserModule } from './user/user.module';
import { Vote } from './vote/entities/vote.entity';
import { VoteModule } from './vote/vote.module';
import { Event } from './event/entities/event.entity';
import { EventModule } from './event/event.module';
import {
  AdminPermission,
  VerifyLogout,
} from './middleware/authGuards.middleware';

dotenv.config();

@Module({
  imports: [
    UserModule,
    VoteModule,
    EventModule,
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      username: process.env.DB_USER,
      password: process.env.DB_PASSWORD,
      database: process.env.DB_DATABASE,
      entities: [User, Vote, Event],
      synchronize: true,
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {
  configure(consumer: MiddlewareConsumer) {
    consumer
      .apply(VerifyLogout)
      .forRoutes({ path: 'user/logout', method: RequestMethod.GET });
    consumer
      .apply(AdminPermission)
      .forRoutes({ path: 'event/createEvent', method: RequestMethod.POST });
    consumer
      .apply(AdminPermission)
      .forRoutes({ path: 'event/status', method: RequestMethod.PUT });
    consumer
      .apply(AdminPermission)
      .forRoutes({ path: 'event', method: RequestMethod.DELETE });
  }
}
