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
import { CreateWordDto, UpdateWordDto, WordListDto } from './dto/index.dto';
import { JwtAuthGuard } from '../auth/guards/jwt-auth.guard';
import { ResponseService } from '../shared/response/response.service';
import { UserEntity } from '../user/user.entity';
import { User } from 'src/decorators/user.decorator';

@Controller('word')
@UseGuards(JwtAuthGuard)
export class WordController {
  constructor(
    private readonly wordService: WordService,
    private readonly responseService: ResponseService,
  ) {}

  /**
   * @description 添加单词
   */
  @Post('/add')
  async create(
    @Req() req,
    @Body('text') text: string,
    @User() user: UserEntity,
  ) {
    const { id } = user;
    const isExist = await this.wordService.isExist(id, text);
    if (isExist) {
      return this.responseService.sendResponse({ msg: '单词已存在' });
    }
    const word = await this.wordService.searchText(text);
    const saveWord = await this.wordService.create(id, word);
    delete saveWord.createdAt;
    delete saveWord.updatedAt;
    delete saveWord.userId;
    (saveWord as any).explains = saveWord.explains.split('/n');
    return this.responseService.sendResponse({ data: saveWord });
  }

  @Get('/list')
  async getWordList(
    @Req() req,
    @Query() query: WordListDto,
    @User() user: UserEntity,
  ) {
    const { id } = user;
    const { page, limit } = query;
    const list = await this.wordService.getWordList(id, page, limit);
    return this.responseService.sendResponse({ data: list });
  }

  @Get('/')
  async findOne(@Req() req, @Query() query, @User() user: UserEntity) {
    const { id } = user;
    const { text } = query;
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
