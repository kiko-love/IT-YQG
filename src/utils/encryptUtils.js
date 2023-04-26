//引用AES源码js
import CryptoJS from "crypto-js";

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF"); //十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse("ABCDEF1234123412"); //十六位十六进制数作为密钥偏移量

//解密方法
function Decrypt(word) {
  //返回的是解密后的对象
  let decrypt = CryptoJS.AES.decrypt(word, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });

  //将解密对象转换成UTF8的字符串
  let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
  //返回解密结果
  return decryptedStr.toString();
}

//加密方法
function Encrypt(word) {
  let srcs = CryptoJS.enc.Utf8.parse(word);
  //CipherOption,加密的一些选项：
  //mode:加密模式，可取值（CBC,CFB,CTR,CTRGladman,OFB,ECB),都在CryptoJS.mode对象下
  //padding:填充方式，可取值（Pkcs7,Ansix923,Iso10126,ZeroPadding,NoPadding),都在CryptoJS.pad对象下
  //iv:偏移量，mode===ECB时，不需要iv
  //返回的是一个加密对象
  let encrypted = CryptoJS.AES.encrypt(srcs, key, {
    iv: iv,
    mode: CryptoJS.mode.CBC,
    padding: CryptoJS.pad.Pkcs7,
  });
  //将结果进行base64加密
  return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

const getUUID = () => {
  // 生成 4 个随机字节作为时间戳的高 4 个字节
  const timeHiBytes = new Uint8Array(4);
  crypto.getRandomValues(timeHiBytes);
  timeHiBytes[0] &= 0x0f;
  timeHiBytes[0] |= 0x40;
  timeHiBytes[1] &= 0x3f;
  timeHiBytes[1] |= 0x80;

  // 生成 2 个随机字节作为时间戳的中间 2 个字节
  const timeMidBytes = new Uint8Array(2);
  crypto.getRandomValues(timeMidBytes);

  // 生成 2 个随机字节作为时间戳的低 2 个字节
  const timeLoBytes = new Uint8Array(2);
  crypto.getRandomValues(timeLoBytes);

  // 生成 2 个随机字节作为时钟序列号
  const clockSeqBytes = new Uint8Array(2);
  crypto.getRandomValues(clockSeqBytes);
  clockSeqBytes[0] &= 0x3f;
  clockSeqBytes[0] |= 0x80;
  // 生成 6 个随机字节作为节点 ID
  const nodeBytes = new Uint8Array(6);
  crypto.getRandomValues(nodeBytes);

  // 将字节序列转换成十六进制字符串形式
  const timeHiHex = ("00" + timeHiBytes[0].toString(16)).slice(-2);
  const timeMidHex =
    ("00" + timeMidBytes[0].toString(16)).slice(-2) +
    ("00" + timeMidBytes[1].toString(16)).slice(-2);
  const timeLoHex =
    ("00" + timeLoBytes[0].toString(16)).slice(-2) +
    ("00" + timeLoBytes[1].toString(16)).slice(-2);
  const clockSeqHex =
    ("00" + clockSeqBytes[0].toString(16)).slice(-2) +
    ("00" + clockSeqBytes[1].toString(16)).slice(-2);
  const nodeHex =
    ("00" + nodeBytes[0].toString(16)).slice(-2) +
    ("00" + nodeBytes[1].toString(16)).slice(-2) +
    ("00" + nodeBytes[2].toString(16)).slice(-2) +
    ("00" + nodeBytes[3].toString(16)).slice(-2) +
    ("00" + nodeBytes[4].toString(16)).slice(-2) +
    ("00" + nodeBytes[5].toString(16)).slice(-2);
  // 根据 UUID 的规范构造 UUID 字符串
  const uuid = `${timeHiHex}${timeMidHex}${timeLoHex}${clockSeqHex}${nodeHex}`;
  return uuid;
};

export { Decrypt, Encrypt,getUUID };
