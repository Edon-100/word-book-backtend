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
  async create(word: IWord) {
    const saveWord = this.wordRepository.create(word);
    return this.wordRepository.save(saveWord);
    // const word = await this.searchText(text);
  }

  findAll() {
    return `This action returns all word`;
  }

  findOne(id: number) {
    return `This action returns a #${id} word`;
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

/* 
{
  returnPhrase: [ 'promise' ],
  query: 'Promise',
  errorCode: '0',
  l: 'en2zh-CHS',
  tSpeakUrl: 'http://openapi.youdao.com/ttsapi?q=%E6%89%BF%E8%AF%BA&langType=zh-CHS&sign=BF24A266630083C1603ACE1D37C01EAC&salt=1608193967937&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
  web: [
    { value: [Array], key: 'Promise' },
    { value: [Array], key: 'promise n' },
    { value: [Array], key: 'promise yourself' }
  ],
  requestId: '3f036849-4da8-4b71-a635-d140f9baf580',
  translation: [ '承诺' ],
  dict: { url: 'yddict://m.youdao.com/dict?le=eng&q=Promise' },
  webdict: { url: 'http://m.youdao.com/dict?le=eng&q=Promise' },
  basic: {
    exam_type: [ '初中', '高中', 'CET4', 'CET6', '考研', 'IELTS' ],
    'us-phonetic': 'ˈprɑːmɪs',
    phonetic: 'ˈprɒmɪs',
    'uk-phonetic': 'ˈprɒmɪs',
    wfs: [ [Object], [Object], [Object], [Object], [Object] ],
    'uk-speech': 'http://openapi.youdao.com/ttsapi?q=Promise&langType=en&sign=AB570D6FB82E508793DB6D88D4671890&salt=1608193967937&voice=5&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false',
    explains: [ 'n. 许诺，允诺；希望', 'vt. 允诺，许诺；给人以……的指望或希望', 'vi. 许诺；有指望，有前途' ],
    'us-speech': 'http://openapi.youdao.com/ttsapi?q=Promise&langType=en&sign=AB570D6FB82E508793DB6D88D4671890&salt=1608193967937&voice=6&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
  },
  isWord: true,
  speakUrl: 'http://openapi.youdao.com/ttsapi?q=Promise&langType=en&sign=AB570D6FB82E508793DB6D88D4671890&salt=1608193967937&voice=4&format=mp3&appKey=298b254664acdfd2&ttsVoiceStrict=false'
}

*/
