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
    console.log(req.user, text);
    const word = await this.wordService.searchText(text);
    const saveWord = Object.assign({}, word, { userId: req.user.id });
    return this.wordService.create(saveWord);
    // return this.wordService.create(createWordDto);
  }

  @Get()
  findAll() {
    return this.wordService.findAll();
  }

  @Get(':id')
  findOne(@Param('id', ParseIntPipe) id: string) {
    console.log(typeof id);
    return this.wordService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateWordDto: UpdateWordDto) {
    return this.wordService.update(+id, updateWordDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.wordService.remove(+id);
  }
}
