import { Injectable } from '@nestjs/common';

@Injectable()
export class AppService {
  getHello(): any {
    // return 'Hello World!';
    console.log('1111');
    return { name: 'edon' };
  }
}
