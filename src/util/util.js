import mimeType from 'mime-types'
import imageToBase64 from 'image-to-base64';
import path from 'path'
import fs from 'fs';

export const image2base64 = async (filePath) => {
  const base64 = await imageToBase64(filePath)
  const fileMimeType = mimeType.lookup(filePath); // 获取文件的 memeType
  // 转换为 data:image/jpeg;base64,***** 格式的字符串
  return 'data:' + fileMimeType + ';base64,' + base64;
}
