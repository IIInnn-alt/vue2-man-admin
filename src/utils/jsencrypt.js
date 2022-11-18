/*
 * @Author: mn
 * @Date: 2022-07-19 11:25:08
 * @LastEditors: mn
 * @LastEditTime: 2022-07-19 11:26:10
 * @Description: JSEncrypt密码加密
 */
import JSEncrypt from 'jsencrypt/bin/jsencrypt.min'
// npm i jsencrypt@3.0.0-rc.1 -S
// 密钥对生成 http://web.chacuo.net/netrsakeypair

const publicKey = `-----BEGIN PUBLIC KEY-----
MFwwDQYJKoZIhvcNAQEBBQADSwAwSAJBALye45PLVsL8KlrgScCG/lvHhrDqSSo0
EmEnjJr1yMPYPc4G9GUhM/x/0D7lumXuxprh2LG5BU5F/xV2q2njuFECAwEAAQ==
-----END PUBLIC KEY-----
`

const privateKey = `-----BEGIN PRIVATE KEY-----
MIIBVQIBADANBgkqhkiG9w0BAQEFAASCAT8wggE7AgEAAkEAvJ7jk8tWwvwqWuBJ
wIb+W8eGsOpJKjQSYSeMmvXIw9g9zgb0ZSEz/H/QPuW6Ze7GmuHYsbkFTkX/FXar
aeO4UQIDAQABAkEAgflbCLTNjH8HEKgNKkXbcJMFFVPcJuDK6Xe/Q+ip94kT6jMu
z68HkxpDDmoF+hRieO+Tiud994ne/1BIqxHtIQIhAN+OYMQQBiz2k0ViJlffF5Ep
4/hv4w9Ij5z4ta4b1mFjAiEA1/6TxWGWyprjTS7Bt9oW8eKgeallzk0jr0qEFa8h
p7sCIQC1ioWCMhERylrl6UKB8STOOVprkVCuRJp7Om0vKmP5SQIgf+v4XKgFhIzj
He0ZMefqOuu7mxJmhx5Mih6Zx7XnOs0CIDdJgVp2S28jYiaBHd8yjkeIanw2WuC6
twvLbX0MwwSn
-----END PRIVATE KEY-----`

// 加密
export function encrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPublicKey(publicKey) // 设置公钥
  return encryptor.encrypt(txt) // 对数据进行加密
}

// 解密
export function decrypt(txt) {
  const encryptor = new JSEncrypt()
  encryptor.setPrivateKey(privateKey) // 设置私钥
  return encryptor.decrypt(txt) // 对数据进行解密
}
