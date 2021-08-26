import * as SC from "expo-secure-store";

export const setToEncryptedStorage = async (
  key: string,
  value: string
): Promise<void> => {
  try {
    await SC.setItemAsync(key, JSON.stringify(value));
  } catch (e) {
    throw new Error(e);
  }
};

export const removeFromEncryptedStorage = async (key: string) => {
  try {
    await SC.deleteItemAsync(key);
  } catch (e) {
    throw new Error(e);
  }
};

export const isAvailableEncrptedStorage = async (): Promise<boolean> => {
  try {
    return await SC.isAvailableAsync();
  } catch {
    return false;
  }
};

export const getFromEncryptedStorage = async (key: string): Promise<any> => {
  try {
    const obj = await SC.getItemAsync(key);

    if (obj !== undefined) {
      return obj;
    } else {
      return null;
    }
  } catch (e) {
    throw new Error(e);
  }
};
