import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseIntPipe,
  UseGuards,
  Req,
  Query,
} from '@nestjs/common';
import { WordService } from './word.service';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseService } from '../shared/response/response.service';

@Controller('word')
@UseGuards(JwtAuthGuard)
export class WordController {
  constructor(
    private readonly wordService: WordService,
    private readonly responseService: ResponseService,
  ) {}

  @Post('/add')
  async create(@Req() req, @Body('text') text: string) {
    const { id } = req.user;
    const isExist = await this.wordService.isExist(id, text);
    if (isExist) {
      return this.responseService.sendResponse({ msg: '单词已存在' });
    }
    const word = await this.wordService.searchText(text);
    const saveWord = await this.wordService.create(id, word);
    delete saveWord.createdAt;
    delete saveWord.updatedAt;
    delete saveWord.userId;
    return this.responseService.sendResponse({ data: saveWord });
  }

  @Get('/list')
  async findAll(@Req() req) {
    const { id } = req.user;
    const list = await this.wordService.findAll(id);
    return this.responseService.sendResponse({ data: list });
  }

  @Get('/')
  async findOne(@Req() req, @Query('text') text: string) {
    const { id } = req.user;
    const word = await this.wordService.findOne(id, text);
    return this.responseService.sendResponse({ data: word });
  }

  // @Patch(':id')
  // update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
  //   return this.wordService.update(+id, updateWordDto);
  // }

  // @Delete(':id')
  // remove(@Param('id') id: string) {
  //   return this.wordService.remove(+id);
  // }
}
