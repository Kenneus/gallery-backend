import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): string {
    return 'Hello Aliaskar!';
  }
  getProfile(): string {
    return 'It"s my profile';
  }
}
