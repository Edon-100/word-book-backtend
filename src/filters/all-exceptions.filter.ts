import {
  ArgumentsHost,
  Catch,
  ExceptionFilter,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { BaseExceptionFilter } from '@nestjs/core';
import { formatDate } from '../utils/date';
import { Logger } from 'nest-logs';

@Catch()
export class HttpExceptionFilter
  extends BaseExceptionFilter
  implements ExceptionFilter
{
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse();
    const request = ctx.getRequest();
    const status =
      exception instanceof HttpException
        ? exception.getStatus()
        : HttpStatus.INTERNAL_SERVER_ERROR;
    let resultMessage = exception.message;
    let resultCode = 1;
    let resultParams = {};
    try {
      const { code, message, ...oth } = JSON.parse(exception.message);
      resultMessage = message;
      resultCode = code;
      resultParams = oth;
    } catch (e) {}
    const validateMsg =
      exception.getResponse &&
      (exception.getResponse().valueOf() as any).message;
    const msg = validateMsg || resultMessage;
    const errorResponse = {
      status,
      message: msg,
      code: resultCode, // 自定义code
      params: resultParams,
      path: request.url, // 错误的url地址
      method: request.method, // 请求方式
      timestamp: new Date().toLocaleDateString(), // 错误的时间
    };
    // 打印日志
    Logger.error(
      `【Logger:${formatDate(Date.now())}】${request.method} ${
        request.url
      } msg:${msg}`,
    );
    // 设置返回的状态码、请求头、发送错误信息
    response.status(status);
    response.header('Content-Type', 'application/json; charset=utf-8');
    response.send(errorResponse);
  }
}
