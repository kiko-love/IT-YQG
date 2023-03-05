//引用AES源码js
import CryptoJS from 'crypto-js'

const key = CryptoJS.enc.Utf8.parse("1234123412ABCDEF");//十六位十六进制数作为密钥
const iv = CryptoJS.enc.Utf8.parse('ABCDEF1234123412');//十六位十六进制数作为密钥偏移量

//解密方法
function Decrypt(word) {
   //返回的是解密后的对象
   let decrypt = CryptoJS.AES.decrypt(word,key,{
        iv:iv,
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7
   });

   //将解密对象转换成UTF8的字符串
   let decryptedStr = decrypt.toString(CryptoJS.enc.Utf8);
   //返回解密结果
   return decryptedStr.toString();
}

//加密方法
function Encrypt(word){
    let srcs = CryptoJS.enc.Utf8.parse(word);
    //CipherOption,加密的一些选项：
    //mode:加密模式，可取值（CBC,CFB,CTR,CTRGladman,OFB,ECB),都在CryptoJS.mode对象下
    //padding:填充方式，可取值（Pkcs7,Ansix923,Iso10126,ZeroPadding,NoPadding),都在CryptoJS.pad对象下
    //iv:偏移量，mode===ECB时，不需要iv
    //返回的是一个加密对象
    let encrypted = CryptoJS.AES.encrypt(srcs,key,{
        iv:iv,
        mode:CryptoJS.mode.CBC,
        padding:CryptoJS.pad.Pkcs7
    });
    //将结果进行base64加密
    return encrypted.ciphertext.toString(CryptoJS.enc.Base64);
}

export {Decrypt,Encrypt}