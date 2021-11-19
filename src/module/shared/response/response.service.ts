import { HttpException, Injectable } from '@nestjs/common';

@Injectable()
export class ResponseService {
  sendResponse({ data = null, code = 200, msg = 'success' }) {
    return { data, code, msg };
  }
  sendError(msg: string, status = 400) {
    throw new HttpException(msg, status);
  }
}
