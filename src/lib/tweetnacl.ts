//@ts-ignore
import nacl from "tweet-nacl-react-native-expo";

interface KeyPair {
  publicKey: Uint8Array;
  secretKey: Uint8Array;
}

export const generateKeyPair = async (
  seed?: string
): Promise<KeyPair | void> => {
  try {
    const keypair = await nacl.sign.keyPair();
    return keypair;
  } catch (e) {
    console.error(e);
  }
};

export const signChallenge = async (privateKey: string, challenge: string) => {
  try {
    const signedChallenge = await nacl.sign(challenge, privateKey);
    return signedChallenge;
  } catch (e) {
    console.error(e);
  }
};
