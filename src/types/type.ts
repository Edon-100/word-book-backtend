export type Constructor<T, Arguments extends unknown[] = undefined[]> = new (
  ...arguments_: Arguments
) => T;

export interface IWord {
  text: string;
  isWord: boolean; // 是否是一个单词
  explains: string; // 中文解析翻译
  phonetic: string; // 音标
  studyLevel: number;
  done: boolean;
  lastLeanDate: Date;
}

export interface IYouDao {
  text: string;
  isWord: boolean;
  explains: string[];
  phonetic: string;
}

interface Learn {
  level?: number;
  done?: boolean;
  learnDate: Date;
}
