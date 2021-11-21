import { Injectable } from '@nestjs/common';
import { CreateWordDto } from './dto/create-word.dto';
import { UpdateWordDto } from './dto/update-word.dto';
import axios from 'axios';
import { REQUEST_BASE_URL } from 'src/constants';
import * as dayjs from 'dayjs';
import { IWord, IYouDao } from 'src/types/type';
import { Repository } from 'typeorm';
import { WordEntity } from './entities/word.entity';
import { InjectRepository } from '@nestjs/typeorm';

@Injectable()
export class WordService {
  constructor(
    @InjectRepository(WordEntity)
    private wordRepository: Repository<WordEntity>,
  ) {}
  async create(userId: number, word: IWord) {
    const wordWithId = Object.assign({ userId }, word);
    const saveWord = this.wordRepository.create(wordWithId);
    return this.wordRepository.save(saveWord);
  }

  async isExist(userId: number, text: string): Promise<boolean> {
    const existWord = await this.wordRepository.findOne({
      userId,
      text,
    });
    return !!existWord;
  }

  async findAll(userId: number) {
    return await this.wordRepository.find({ userId });
  }

  async findOne(userId: number, text: string) {
    const existWord = await this.wordRepository.findOne({
      userId,
      text,
    });
    return existWord;
  }

  update(id: number, updateWordDto: UpdateWordDto) {
    return `This action updates a #${id} word`;
  }

  remove(id: number) {
    return `This action removes a #${id} word`;
  }

  async searchText(text: string): Promise<IWord> {
    const {
      data: { content },
    } = await axios.get(
      `${REQUEST_BASE_URL}?text=${text}&appkey=${process.env.YD_APP_KEY}&key=${process.env.YD_KEY}`,
    );
    console.log(content);
    const word = {
      text,
      isWord: content?.isWord,
      explains: content?.isWord
        ? content.basic.explains.join('/n')
        : content.translation[0],
      phonetic: content?.basic?.phonetic,
      done: false,
      studyLevel: 0,
      lastLeanDate: new Date(),
    };
    return word;
  }
}
