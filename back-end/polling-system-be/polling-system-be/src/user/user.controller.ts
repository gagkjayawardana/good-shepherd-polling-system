import { Body, Controller, Get, Inject, Post, Req, Res } from '@nestjs/common';
import { Request, Response } from 'express';
import { LoginUserDto, RegisterUserDto } from './dto/user.dto';
import { UserService } from './user.service';

@Controller('user')
export class UserController {
  constructor(
    @Inject('USER_SERVICE')
    private readonly userService: UserService,
  ) {}

  @Post('/register')
  async registerUser(@Body() newUser: RegisterUserDto, @Res() res: Response) {
    try {
      const { userName, password, email } = newUser;

      const user = await this.userService.createUserService({
        userName,
        email: email.toLowerCase(),
        password,
      });
      res.status(200);
      res.json(user);
      return;
    } catch (err) {
      res.status(400);
    }
  }

  @Post('/login')
  async loginUser(@Body() userData: LoginUserDto, @Res() res: Response) {
    console.log('cookies ', res.cookie);
    try {
      const { userName, password } = userData;

      const user = await this.userService.loginUserService({
        userName,
        password,
      });
      if (!('err' in user)) {
        const newToken = this.userService.createToken(user);
        res.cookie('accessToken', newToken.newAccessToken, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        });
        res.cookie('refreshToken', newToken.newAccessToken, {
          maxAge: 60 * 60 * 24 * 1000,
          httpOnly: true,
        });

        res.status(200);
        res.json(user);

        return;
      }
    } catch (err) {
      res.status(400);
    }
  }

  @Get('/logout')
  logoutUser(@Res() res: Response) {
    try {
      res.cookie('accessToken', '', {
        maxAge: -1,
        httpOnly: true,
      });
      res.cookie('refreshToken', '', {
        maxAge: -1,
        httpOnly: true,
      });

      res.status(200);
      res.json({ msg: 'Successfully logged out' });
    } catch (err) {
      res.status(400);
    }
  }

  @Get('/getUser')
  async getLogedUser(@Req() req: Request, @Res() res: Response) {
    try {
      const userToken = req.cookies.accessToken;
      const user = await this.userService.getLogedUserService(userToken);
      res.status(200);
      res.json(user);
    } catch (err) {
      console.log(err);
      res.status(400);
    }
  }

  @Post('/refresh')
  async refreshUser(@Req() req: Request, @Res() res: Response) {
    try {
      const refToken = req.cookies.refreshToken;
      console.log('refroken, ', refToken);
      const userToken = await this.userService.refreshService(refToken);
      if (userToken) {
        res.cookie('accessToken', userToken.newAccessToken, {
          maxAge: 60 * 60 * 1000,
          httpOnly: true,
        });

        res.status(200);
        res.json(userToken);
      }
    } catch (err) {
      res.status(400);
    }
  }
}
