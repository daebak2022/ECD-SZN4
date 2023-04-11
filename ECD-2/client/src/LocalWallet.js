import * as secp from "ethereum-cryptography/secp256k1";
import { keccak256 } from "ethereum-cryptography/keccak";
import { hexToBytes, toHex } from "ethereum-cryptography/utils";

/**
 * Local wallet.
 * Simulate a MetaMask-like wallet which stores private keys safely,
 * and gives access to public key/address.
 * Keys are store in hexadecimal format.
 */


// List of account keys in hexa format without the '0x'
const ACCOUNT_KEYS = new Map([
  [
    "bob",
    {
      private:
        "2a820f3eede9a8d7e501a7b72fb805427f0b497862250f40c217dda4a8b7808b",
      public:
        "04d0a22c2e5700d8f82e271b12d8e090d7ef57de1fac46b841c6a9bda6dfcaf2c3879282fa11b1cbe9471bc312899e35382cc9cf4f75c52f5170f160df56ea62ec",
    },
  ],
  [
    "alice",
    {
      private:
        "9ed2e34d08773deaecde30867d010cf6e4912aae77915e4fea5e3b22b00bffcf",
      public:
        "04e0d5bf8c136b576597ea2f964d01a476ed91cfac88e19b565bfe963b52b84b3eba2d3a256192f0456b6f80190b60a4cb53b806d64387a1b3b8854fc759c4e3b3",
    },
  ],
  [
    "charles",
    {
      private:
        "a790b9079b8d5e265d8de2668b2e884ec3019bcfc78f2242ef1f9e9302767805",
      public:
        "04b9dafc19674dea962777018931019d33e31c05632dfdc3907243f6424b35961dd249b0fbc0cb06515872022b78a523606edeedf1b5818048cf9f60fede51fe89",
    },
  ],
]);

// user names derived from the list of accounts
const USERS = Array.from(ACCOUNT_KEYS.keys());

/**
 * Hash a message using KECCAK-256
 * @param message the message to hash.
 * @returns the hash of the message.
 */
const hashMessage = (message) => keccak256(Uint8Array.from(message));

/**
 * Get the user public key.
 * @param user the user
 * @returns the public key as a Uint8Array.
 */
const getPublicKey = (user) => {
  if (!user) return null;
  return hexToBytes(ACCOUNT_KEYS.get(user).public);
};

/**
 * Get the user private key.
 * @param user the user.
 * @returns the private key as a Uint8Array.
 */
const getPrivateKey = (user) => {
  if (!user) return null;
  return hexToBytes(ACCOUNT_KEYS.get(user).private);
};

/**
 * Derive the address from the public key of an user.
 * @param user the user.
 * @returns the user address as a hexa string.
 */
const getAddress = (user) => {
  if (!user) return null;
  const pubKey = getPublicKey(user);
  const hash = keccak256(pubKey.slice(1));
  return toHex(hash.slice(-20)).toUpperCase();
};

/**
 * Get the public key of an user in hexa format.
 * @param user the user.
 * @returns the public key.
 */
const getHexPubKey = (user) => {
  if (!user) return null;
  return toHex(getPublicKey(user)).toUpperCase();
};

/**
 * Sign a message.
 * @param username name of the user account.
 * @param message message to sign
 * @returns the signature in hexa format with the recovery bit as the first byte.
 */
const sign = async (username, message) => {
  const privateKey = getPrivateKey(username);
  const hash = hashMessage(message);

  const [signature, recoveryBit] = await secp.sign(hash, privateKey, {
    recovered: true,
  });
  const fullSignature = new Uint8Array([recoveryBit, ...signature]);
  return toHex(fullSignature);
};

const wallet = {
  USERS,
  sign,
  getAddress,
  getHexPubKey,
};
export default wallet;
