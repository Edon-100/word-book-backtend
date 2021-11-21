// const axios = require('axios');
// const bcrypt = require('bcrypt');
import axios from 'axios';
// import bcrypt from 'bcrypt';
import * as CryptoJs from 'crypto-js';

/* 
YD_APP_KEY=3bc15f324114c0f3
YD_KEY=v5rQlNuFWiR5SrwW5ob5jl4SUbDhFDua
*/
const base = 'https://openapi.youdao.com/api';

// const appKey = '3bc15f324114c0f3';
// const key = 'v5rQlNuFWiR5SrwW5ob5jl4SUbDhFDua';
// const salt = new Date().getTime();
// const curtime = Math.round(new Date().getTime() / 1000);
// const query = '您好，欢迎再次使用有道智云文本翻译API接口服务';
// const from = 'zh-CHS';
// const to = 'en';
// const str1 = appKey + truncate(query) + salt + curtime + key;
// const sign = CryptoJs.SHA256(str1).toString(CryptoJs.enc.Hex);
// const vocabId = 'edon';

const appKey = '3bc15f324114c0f3';
const key = 'v5rQlNuFWiR5SrwW5ob5jl4SUbDhFDua'; //注意：暴露appSecret，有被盗用造成损失的风险
const salt = new Date().getTime();
const curtime = Math.round(new Date().getTime() / 1000);
const query = 'fuck';
// 多个query可以用\n连接  如 query='apple\norange\nbanana\npear'
const from = 'zh-CHS';
const to = 'en';
const str1 = appKey + truncate(query) + salt + curtime + key;
const vocabId = '您的用户词表ID';
const sign = CryptoJs.SHA256(str1).toString(CryptoJs.enc.Hex);

function truncate(q) {
  const len = q.length;
  if (len <= 20) return q;
  return q.substring(0, 10) + len + q.substring(len - 10, len);
}

axios
  .get(base, {
    params: {
      q: query,
      appKey: appKey,
      salt: salt,
      from: from,
      to: to,
      sign: sign,
      signType: 'v3',
      curtime: curtime,
      vocabId: vocabId,
    },
  })
  .then((res) => {
    console.log(res.data);
  });

/* 
  const data = {
  q: query,
  appKey: appKey,
  salt: salt,
  from: from,
  to: to,
  sign: sign,
  signType: 'v3',
  curtime: curtime,
};
console.log('data', data);
  
  */
