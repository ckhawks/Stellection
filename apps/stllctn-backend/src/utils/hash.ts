import { BinaryLike, createHash } from 'crypto';
// const fs = require('fs');
// const buff = fs.readFileSync('hello.txt');
// const hash = createHash('md5').update(buff).digest('hex');

export const md5HashFromBinaryLike = (inputStream: BinaryLike) => {
  const hash = createHash('md5').update(inputStream).digest('hex');

  return hash;
}