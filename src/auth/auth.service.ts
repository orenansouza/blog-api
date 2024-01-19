import { HttpException, HttpStatus, Injectable } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';

import { JwtPayload } from './dto/jwt-payload.dto';
import { UserService } from 'src/users/users.service';
import { User } from 'src/users/users.entity';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async generateToken(
    payload: JwtPayload,
  ): Promise<{ id: number; access_token: string }> {
    const access_token = this.jwtService.sign(payload);
    return { id: payload.id, access_token };
  }

  async validateUserById(userId: number): Promise<User> {
    return this.userService.findOneById(userId);
  }

  async login(
    email: string,
    password: string,
  ): Promise<{ id: number; access_token: string }> {
    const user = await this.userService.findOneByEmail(email);

    if (email !== user.email || password !== user.password) {
      throw new HttpException('Credenciais inválidas', HttpStatus.UNAUTHORIZED);
    }

    return this.generateToken({ email, id: user.id });
  }
}
