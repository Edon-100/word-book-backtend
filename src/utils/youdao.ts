import axios from 'axios';
import * as CryptoJs from 'crypto-js';
import { YOUDAO_API } from '../constants/index';

function truncate(q: string) {
  const len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}
export async function getYoudaoTranslate(
  query: string,
  from = 'zh-CHS',
  to = 'en',
) {
  // const vocabId = '您的用户词表ID';
  try {
    const appKey = process.env.YD_APP_KEY;
    const key = process.env.YD_KEY;
    const salt = new Date().getTime();
    const curtime = Math.round(new Date().getTime() / 1000);
    const str1 = appKey + truncate(query) + salt + curtime + key;
    const sign = CryptoJs.SHA256(str1).toString(CryptoJs.enc.Hex);
    const res = await axios.get(YOUDAO_API, {
      params: {
        q: query,
        appKey: appKey,
        salt: salt,
        from: from,
        to: to,
        sign: sign,
        signType: 'v3',
        curtime: curtime,
      },
    });
    return res.data;
  } catch (error) {
    console.log('error', error);
    return null;
  }
}
