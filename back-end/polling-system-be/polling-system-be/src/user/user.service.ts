import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { User } from './entities/user.entity';
import { Repository } from 'typeorm';
import { UserInterface } from './interfaces/user.interface';
import * as bcrypt from 'bcrypt';
import { config } from '../utils/config';
import * as jwt from 'jsonwebtoken';
import { JwtPayload } from 'jsonwebtoken';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';

@Injectable()
export class UserService {
  constructor(
    @InjectRepository(User)
    private userRepository: Repository<UserInterface>,
  ) {}

  async createUserService(newUser: RegisterUserDto) {
    try {
      const user = new User();
      user.userName = newUser.userName;
      user.email = newUser.email;
      user.password = newUser.password;
      return await this.userRepository.save(user);
    } catch (err) {
      return { err: 'Registration Failed' };
    }
  }

  async loginUserService(userData: LoginUserDto) {
    try {
      const findUser = await this.userRepository.findOneBy({
        userName: userData.userName,
      });
      if (!findUser) {
        console.log('User Not Found');
      } else {
        const checkPassword = await bcrypt.compare(
          userData.password,
          findUser.password,
        );
        if (!checkPassword) {
          console.log('Password Not Match');
        } else {
          return findUser;
        }
      }
    } catch (err) {
      return { err: 'Login Failed' };
    }
  }

  createToken(user: UserInterface) {
    try {
      const secret = config.jwt_secret_key;
      const tokenData = {
        email: user.email,
        role: user.role,
      };
      return {
        newAccessToken: jwt.sign(tokenData, secret, { expiresIn: '1h' }),
        newRefreshToken: jwt.sign(tokenData, secret, { expiresIn: '24h' }),
        tokenData,
      };
    } catch (err) {
      console.log(err);
    }
  }

  async refreshService(refreshToken: string) {
    try {
      const verifyRefToken = jwt.verify(
        refreshToken,
        config.jwt_secret_key,
      ) as JwtPayload;
      if (!verifyRefToken) {
        console.log('Unauthorized');
      } else {
        const userEmail = verifyRefToken.email;
        const findUser = await this.userRepository.findOneBy({
          email: userEmail,
        });
        const secret = config.jwt_secret_key;
        const tokenData = {
          email: findUser.email,
          role: findUser.role,
        };
        const newAccessToken = jwt.sign(tokenData, secret, {
          expiresIn: '1h',
        });
        return {
          newAccessToken,
          tokenData,
        };
      }
    } catch (err) {
      return { err: 'Cannot Get New Access Token' };
    }
  }

  async getLogedUserService(accToken: string) {
    try {
      const verifyAccToken = jwt.verify(
        accToken,
        config.jwt_secret_key,
      ) as JwtPayload;
      if (!verifyAccToken) {
        console.log('Unauthorized');
      } else {
        const userEmail = verifyAccToken.email;
        const findUser = await this.userRepository.findOneBy({
          email: userEmail,
        });
        return findUser;
      }
    } catch (err) {
      return { err: 'Cannot find User' };
    }
  }
}
