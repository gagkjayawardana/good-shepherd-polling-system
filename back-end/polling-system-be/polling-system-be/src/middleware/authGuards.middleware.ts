import { Injectable, NestMiddleware } from '@nestjs/common';
import { Request, Response, NextFunction } from 'express';
import * as jwt from 'jsonwebtoken';
import { config } from '../utils/config';

@Injectable()
export class AdminPermission implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.cookies.accessToken;
      if (!token) {
        return res.status(403).send('Token not found');
      }
      const tokenData = jwt.verify(
        token,
        config.jwt_secret_key,
      ) as jwt.JwtPayload;
      if (tokenData.role !== 'admin') {
        return res.status(401).send('Do not have Permission');
      }
      return next();
    } catch (err) {
      return res.status(403).send('Invalid Token');
    }
  }
}

@Injectable()
export class VerifyLogout implements NestMiddleware {
  use(req: Request, res: Response, next: NextFunction) {
    const token = req.cookies.accessToken;
    if (!token) {
      return res.sendStatus(403).send('Token not found');
    }
    try {
      jwt.verify(token, config.jwt_secret_key);
      return next();
    } catch (err) {
      return res.sendStatus(403);
    }
  }
}
