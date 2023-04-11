/**
 * This script is used to generate private/public key pairs,
 * in order to initialize user wallets on the client side and
 * user address on the server side.
 */
const secp = require("ethereum-cryptography/secp256k1");
const { toHex } = require("ethereum-cryptography/utils");
const crypto = require("../crypto");

const privateKey = secp.utils.randomPrivateKey();
const publicKey = secp.getPublicKey(privateKey);

console.log("private key : ", toHex(privateKey));
console.log("public key  : ", toHex(publicKey));
console.log("address : ", crypto.pubKeyToAddress(publicKey));

/*
- node generate.js 결과

private key :  2a820f3eede9a8d7e501a7b72fb805427f0b497862250f40c217dda4a8b7808b
public key  :  04d0a22c2e5700d8f82e271b12d8e090d7ef57de1fac46b841c6a9bda6dfcaf2c3879282fa11b1cbe9471bc312899e35382cc9cf4f75c52f5170f160df56ea62ec
address :  6EB019BB31F5985FD52DDB2FE8C1E14E50B537DA

private key :  9ed2e34d08773deaecde30867d010cf6e4912aae77915e4fea5e3b22b00bffcf
public key  :  04e0d5bf8c136b576597ea2f964d01a476ed91cfac88e19b565bfe963b52b84b3eba2d3a256192f0456b6f80190b60a4cb53b806d64387a1b3b8854fc759c4e3b3
address :  29DEB08566D7D6383E21C5291DF660A5EC9315F8

private key :  a790b9079b8d5e265d8de2668b2e884ec3019bcfc78f2242ef1f9e9302767805
public key  :  04b9dafc19674dea962777018931019d33e31c05632dfdc3907243f6424b35961dd249b0fbc0cb06515872022b78a523606edeedf1b5818048cf9f60fede51fe89
address :  0285DC17695F3C654EFCEF6E88A03CF7F5586645
*/