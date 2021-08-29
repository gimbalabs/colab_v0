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

// export const
