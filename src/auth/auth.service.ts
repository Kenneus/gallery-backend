import { Injectable, UnauthorizedException } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import * as argon2 from 'argon2';
import { IUser } from 'src/types/types';
import { UserService } from 'src/user/user.service';

@Injectable()
export class AuthService {
  constructor(
    private readonly userService: UserService,
    private readonly jwtService: JwtService,
  ) {}

  async validateUser(email: string, password: string): Promise<any> {
    const user = await this.userService.findOne(email);
    if (!user) {
      throw new UnauthorizedException('User not found');
    }
    const passwordIsMatch = await argon2.verify(user.password, password);
    if (passwordIsMatch) {
      return user;
    }
    throw new UnauthorizedException('Password is incorrect');
  }

  async login(user: IUser) {
    const { id, email } = user;

    return {
      id,
      email,
      token: this.jwtService.sign({ id: user.id, email: email }),
    };
  }
}
