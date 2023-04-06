/**
 * This script is used to generate private/public key pairs,
 * in order to initialize user wallets on the client side and
 * user address on the server side.
 */
/* 
secp는 ethereum-cryptography/secp256k1 암호화 모듈입니다. 
ethereum-cryptography/utils 의 toHex 메서드입니다. 
byte array로 넘어온 정보를 16진수(hexadecimal)로 변환해서 보여줍니다. 
우리가 일반적으로 보는 private key 모습입니다.
*/
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");

/* publicKey 생성 후 주석 처리 */
// const privateKey = secp.utils.randomPrivateKey();
// const publicKey = secp.getPublicKey(privateKey);

// console.log("private key : ", toHex(privateKey));
// console.log("toHex(public key)  : ", toHex(publicKey));

/* 생성된 publicKey
PS C:\workspace\ECD-SZN4\ECD-SZN4\ECD-2\server\scripts> node generate.js
private key :  5754efa33da388141d6a4ef6b8d6d7f8ab73975985ed6124354ff123617dd29c
public key  :  04cb57ecadf322fcbd84f439b26abfa8d9aae788cd274962875e9b565c357c8b5f59ffe38de5db9af44d4d41503a9bbeb1b6059f66884b78e5c1ed54cf60402a43

PS C:\workspace\ECD-SZN4\ECD-SZN4\ECD-2\server\scripts> node generate.js
private key :  65d63f1a5368dd9e89061ff96c2b0e1d3e8a6762595f1a191a2f4cce6502f0d8
public key  :  04d72a8070d7d4f5fe1da1a3d540bcf1e4c972810937725288681080eda14cfbd10891e9e4e6f530792ead6512f84b80cd4bf8218f94d2cdc154db6b79421c880c

PS C:\workspace\ECD-SZN4\ECD-SZN4\ECD-2\server\scripts> node generate.js
private key :  620a6df7ac065f7c8f5293b42153ffbbfac92d3e1bf613e6c8d4303068469fcb
public key  :  0438f74783ef8d826277c2413668e6595e6f440d1d72554cbaa61e18db15ae1be325e174f0b0c93d31d3b95b62a034c491eb6b136447ec219e06ddd25163b40676
*/

/* 
1. ethereum-cryptography 라이브러리를 로드하고, keccak256을 가져오는 선언을 합니다. 
2. publicKey를 입력받아,keccak256으로 변환한 후, 뒤의 20자리를 잘라내는 함수를 만듭니다. 
3. 위에서 생성된 publicKey를 이 function에 인수로 보내서 만들면 됩니다 
*/
 const { keccak256 } = require("ethereum-cryptography/keccak");
 const publics = [["04cb57ecadf322fcbd84f439b26abfa8d9aae788cd274962875e9b565c357c8b5f59ffe38de5db9af44d4d41503a9bbeb1b6059f66884b78e5c1ed54cf60402a43"], 
                 ["04d72a8070d7d4f5fe1da1a3d540bcf1e4c972810937725288681080eda14cfbd10891e9e4e6f530792ead6512f84b80cd4bf8218f94d2cdc154db6b79421c880c"], 
                 ["0438f74783ef8d826277c2413668e6595e6f440d1d72554cbaa61e18db15ae1be325e174f0b0c93d31d3b95b62a034c491eb6b136447ec219e06ddd25163b40676"]]

 function getAddress(publicKey){
 	return keccak256(publicKey.slice(1)).slice(~20); 
 }

 publics.map(function(str) {
    console.log("map.str : " + str)
    //console.log("keccak256(public key)  : ", getAddress(str));
 });

